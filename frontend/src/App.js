import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Image } from 'antd';
import logo from './assets/img/logo.jpg'

import ClassificationList from './modules/ClassificationList';
import ClassificationRegister from './modules/RegisterClassification';
import SideMenu from './components/SideMenu';

const { Sider, Content, Footer, Header } = Layout;

export default function App() {
  
  return (
    <Layout style={{flexDirection: "row"}}>
      <Sider style={{ height: "100vh", backgroundColor: "white"}}>
        <Image  src={logo} preview={false} />
        <SideMenu/>
      </Sider>
      <Layout>
        
        <Content style={{ backgroundColor: "#f2f2f2" }}>
          <Routes>
            <Route path="/" element={<ClassificationList/>}/>
            <Route path="register-classification" element={<ClassificationRegister/>}/>
          </Routes>
        </Content>
        <Footer style={{textAlign: "center", backgroundColor: "white"}}>
          Sorask - Classificação de risco © 2022
        </Footer>
      </Layout>
    </Layout>
  )
}
