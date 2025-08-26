import React, { useEffect, useState } from 'react';
import './Header.css';
import { Avatar, Dropdown, Menu, Modal, Button } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  CalendarOutlined,
  
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);  // client
  const [host, setHost] = useState(null);  // host
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const storedHost = JSON.parse(localStorage.getItem('host'));
    setUser(storedUser);
    setHost(storedHost);

    const syncUser = () => {
      setUser(JSON.parse(localStorage.getItem('user')));
      setHost(JSON.parse(localStorage.getItem('host')));
    };

    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === 'update') {
      if (key === 'update') {
  if (host) {
    navigate('/host-update');
  } else {
    navigate('/update-account');
  }
};
    } else if (key === 'logout') {
      localStorage.clear();
      setUser(null);
      setHost(null);
      navigate('/');
    } else if (key === 'login') {
      setIsModalVisible(true);
    } else if (key === 'manage') {
      navigate('/manage-events');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {host ? (
        <>
          <Menu.Item key="manage" icon={<CalendarOutlined />}>
            Manage Events
          </Menu.Item>
          <Menu.Item key="update" icon={<SettingOutlined />}>
            Update Account
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </>
      ) : user ? (
        <>
          <Menu.Item key="update" icon={<SettingOutlined />}>
            Update Account
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" icon={<UserOutlined />}>
          Login
        </Menu.Item>
      )}
    </Menu>
  );

  const handleClientLogin = () => {
    setIsModalVisible(false);
    navigate('/login');
  };

  const handleHostLogin = () => {
    setIsModalVisible(false);
    navigate('/host-login');
  };

  const greeting = host
    ? `Hi, ${host.firstName}! (Host)`
    : user
    ? `Hi, ${user.firstName}!`
    : null;

  return (
    <>
      <header className="header_box">
        <Link to="/">
          <img className="header_logo" src={logo} alt="logo" />
        </Link>

        <div className="tabs">
          <Link to="/" className="tab">Featured Events</Link>
          <Link to="/music" className="tab">Music</Link>
          <Link to="/business" className="tab">Business</Link>
          <Link to="/education" className="tab">Educational</Link>

          {/* Conditionally show extra tabs */}
          {user && (
            <Link to="/my-events" className="tab">My Events</Link>
          )}
          {host && (
            <Link to="/dashboard" className="tab">Dashboard</Link>
          )}
        </div>

        <div className="user_area">
          {greeting && <span className="user_greeting">{greeting}</span>}
          <Dropdown overlay={menu} placement="bottomRight" trigger={['click']}>
            <Avatar icon={<UserOutlined />} size={50} style={{ cursor: 'pointer' }} />
          </Dropdown>
        </div>
      </header>

      <Modal
        title="Login As"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <div className="login-role-selection">
  <div className="login-card" onClick={handleClientLogin}>
   
    <h3>Client</h3>
    <p>Book your favorite events and manage your bookings.</p>
  </div>

  <div className="login-card" onClick={handleHostLogin}>
    
    <h3>Host</h3>
    <p>Create and manage your events with powerful tools.</p>
  </div>
</div>
      </Modal>
    </>
  );
};

export default Header;
