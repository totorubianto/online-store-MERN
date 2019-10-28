import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Cascader } from 'antd';

const ForgotPassword = ({ forgotPassword }) => {
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou'
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men'
            }
          ]
        }
      ]
    }
  ];
  function onChange(value) {
    console.log(value);
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <Cascader options={options} onChange={onChange} />
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
  null
)(ForgotPassword);
