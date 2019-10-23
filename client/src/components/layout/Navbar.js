import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Menu } from 'antd';
import './style/Navbar.css';
import { Drawer, Button } from 'antd';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = layout => (
    <Menu mode={layout}>
      <Menu.Item key='signup'>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt' />{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </Menu.Item>
    </Menu>
  );

  const guestLinks = layout => (
    <Menu mode={layout}>
      <Menu.Item key='signin'>
        <Link to='/login'>Signin</Link>
      </Menu.Item>
      <Menu.Item key='signup'>
        <Link to='/register'>Signup</Link>
      </Menu.Item>
    </Menu>
  );

  const leftNav = layout => (
    <Menu mode={layout}>
      <Menu.Item key='home'>
        <Link to=''>Home</Link>
      </Menu.Item>

      <Menu.Item key='contactus'>
        <Link to=''>Contact Us</Link>
      </Menu.Item>
    </Menu>
  );
  const rightNav = layout =>
    !loading && (
      <Fragment>
        {isAuthenticated ? authLinks(layout) : guestLinks(layout)}
      </Fragment>
    );
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  return (
    <nav className='menuBar'>
      <div className='logo'>
        <Link to=''>logo</Link>
      </div>
      <div className='menuCon'>
        <div className='leftMenu'>{leftNav('horizontal')}</div>
        <div className='rightMenu'>{rightNav('horizontal')}</div>
        <Button className='barsMenu' type='primary' onClick={e => showDrawer()}>
          <span className='barsBtn'></span>
        </Button>
        <Drawer
          title='Basic Drawer'
          placement='right'
          closable={false}
          onClose={e => onClose()}
          visible={visible}
        >
          {leftNav('vertical')}
          {rightNav('vertical')}
        </Drawer>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
