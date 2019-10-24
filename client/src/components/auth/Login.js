import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Form, Icon, Input, Button, Checkbox } from 'antd';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { email, password } = formData;
  const onRememberMe = e => {
    setRememberMe(e.target.checked);
  };
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    login(email, password, rememberMe);
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>Sign Into Your Account</p>
            <Form onSubmit={e => onSubmit(e)} className='login-form'>
              <Form.Item>
                <Input
                  type='email'
                  value={email}
                  name='email'
                  onChange={e => onChange(e)}
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Username'
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type='password'
                  name='password'
                  value={password}
                  onChange={e => onChange(e)}
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <div className='d-flex justify-content-between'>
                  <Checkbox onChange={e => onRememberMe(e)}>
                    Remember me
                  </Checkbox>
                  <Link className='login-form-forgot' to='/forgotpassword'>
                    Forgot password
                  </Link>
                </div>
              </Form.Item>
              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Log in
                </Button>
                Or <Link to='/register'>register now!</Link>
              </Form.Item>
            </Form>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
