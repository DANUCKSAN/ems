import React, { useEffect } from 'react';

import { Layout, theme } from 'antd';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
  import AOS from 'aos';
import 'aos/dist/aos.css';
import * as path from './components/configs/routePath'; 

import LogIn from './components/pages/login/logIn';
import Presentation from './components/pages/presentation/presentation';
import Header from './components/header/header';
import Register from './components/pages/registration/register';
import UpdateAccount from './components/pages/updateAccount/updateAccount';
import HostLogin from './components/pages/hostLogin/hostLogin';
import HostRegister from './components/pages/hostRegister/hostRegister';

const { Content } = Layout;


const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();



useEffect(() => {
  AOS.init({ duration: 1000 });
}, []);


  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
         <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  
                }}
              />
        <Content style={{ margin: '24px 16px 0', background: colorBgContainer }}>
          <div style={{ padding: 20, minHeight: 1000 }}>
            <Routes>
              <Route path={path.loginPath} element={<LogIn />} />
              <Route path={path.presentationPath} element={<Presentation />} />
              <Route path={path.registerPath} element={<Register/>} />
              <Route path="/update-account" element={<UpdateAccount />} />
              <Route path="/host-login" element={<HostLogin />} />
              <Route path="/host-register" element={<HostRegister/>} />


            </Routes>
          </div>
        </Content>
      </Layout>
    </Router> 
  );
};

export default App;
