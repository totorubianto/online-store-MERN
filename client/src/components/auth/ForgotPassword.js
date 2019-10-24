import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { forgotPassword } from '../../actions/auth';
import { Form, Icon, Input, Button } from 'antd';

const ForgotPassword = ({ forgotPassword }) => {
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <Fragment>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <h1 className='large text-primary'>ForgotPassword</h1>
            <p className='lead'>forgot password to recover your password</p>
            <Form onSubmit={e => onSubmit(e)} className='login-form'>
              <Form.Item>
                <Input
                  type='email'
                  value={email}
                  name='email'
                  onChange={e => onChange(e)}
                  prefix={
                    <Icon type='mail' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='Username'
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type='primary'
                  htmlType='submit'
                  className='login-form-button'
                >
                  Forgot Password
                </Button>
                Or <Link to='/login'>Login Now!</Link>
              </Form.Item>
            </Form>
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </Fragment>
  );
};

ForgotPassword.propTypes = {
  forgotPassword: PropTypes.func.isRequired
};

export default connect(
  null,
  { forgotPassword }
)(ForgotPassword);
