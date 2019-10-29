import axios from 'axios';
import { setAlert } from './alert';
import {} from './types';
import setAuthToken from '../utils/setAuthToken';

// Login User
export const login = (email, password, rememberme) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password, rememberme });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    let errors = [];

    if (err.response.data) {
      errors = err.response.data.errors;
    }

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

//forgot password
export const forgotPassword = email => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post('/api/auth/forgotpassword', body, config);

    dispatch({
      type: EMAIL_SEND,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'error')));
    }

    dispatch({
      type: EMAIL_FAIL
    });
  }
};
