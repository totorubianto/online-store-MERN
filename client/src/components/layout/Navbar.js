import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { Menu, Avatar, Typography } from 'antd';
import './style/Navbar.css';
import { Drawer, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Text } = Typography;

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  const authLinks = layout => (
    <Menu mode={layout}>
      <Menu.Item className='not-hover' key='signin'>
        <Link to='/login'>
          <Button type='primary'>Tambah Store</Button>
        </Link>
      </Menu.Item>
      <SubMenu
        className='not-hover'
        title={
          <span>
            <Avatar
              size='large'
              src='https://cdns.klimg.com/dream.co.id/resized/500x/real/2019/01/03/362742/gadis-kaya-malaysia.jpg'
            />
            <lable className='ml-2'>{user.name}</lable>
          </span>
        }
      >
        <MenuItemGroup title='Store'>
          <Menu.Item key='setting:1'>
            <Avatar src='https://cdns.klimg.com/dream.co.id/resized/500x/real/2019/01/03/362742/gadis-kaya-malaysia.jpg' />
            <Text className='ml-1'>Malefincent Store</Text>
          </Menu.Item>
          <Menu.Item key='setting:2'>
            <Avatar src='https://cdns.klimg.com/dream.co.id/resized/500x/real/2019/01/03/362742/gadis-kaya-malaysia.jpg' />
            <Text className='ml-1'>Shooes Store</Text>
          </Menu.Item>
        </MenuItemGroup>
        <Menu.Item onClick={logout} key='setting:4'>
          Logout
        </Menu.Item>
      </SubMenu>
    </Menu>
  );

  const guestLinks = layout => (
    <Menu mode={layout}>
      <Menu.Item className='not-hover' key='signin'>
        <Link to='/login'>Signin</Link>
      </Menu.Item>
      <Menu.Item className='not-hover' key='signup'>
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
        {console.log(user)}
      </div>
      <div className='menuCon'>
        <div className='leftMenu'>{leftNav('horizontal')}</div>
        <div className='rightMenu'>{rightNav('horizontal')}</div>
        <Button className='barsMenu' type='primary' onClick={e => showDrawer()}>
          <span className='fa fa-bars'></span>
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
