import React, { Fragment, useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProvinceAndRegency } from '../../actions/profile';
import { Cascader } from 'antd';

const AddProfile = ({ profile, getProvinceAndRegency }) => {
  useEffect(() => {
    getProvinceAndRegency();
  }, [getProvinceAndRegency]);

  function onChange(value) {
    console.log(value);
  }
  let address;
  console.log(profile.addressAPI);
  if (profile === null) {
    address = [
      {
        value: 'null',
        label: 'null'
      },
      {
        value: 'null',
        label: 'null'
      }
    ];
  } else {
    address = profile.addressAPI;
  }

  return (
    <Fragment>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-md-4'></div>
          <div className='col-md-4'>
            <Cascader options={address} onChange={onChange} />
          </div>
          <div className='col-md-4'></div>
        </div>
      </div>
    </Fragment>
  );
};

AddProfile.propTypes = {
  getProvinceAndRegency: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(
  mapStateToProps,
  { getProvinceAndRegency }
)(AddProfile);
