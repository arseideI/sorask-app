import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Image } from 'antd';
import logo from './assets/img/logo.jpg'

import ClassificationList from './modules/ClassificationList';
import ClassificationRegister from './modules/RegisterClassification';
import MainPainel from './modules/MainPainel';
import SideMenu from './components/SideMenu';
import SymptomsList from './modules/SymptomsList';
import RegisterSymptom from './modules/RegisterSymptoms';
import RegisterNurse from './modules/RegisterNurse';
import NurseList from './modules/NurseList';
import GenerationPdf from './modules/GenerationPdf';


const { Sider, Content, Footer, Header } = Layout;

export default function App() {
  document.title = "Sorask"
  return (
    <Layout style={{flexDirection: "row"}}>
      <Sider style={{ height: "100vh", backgroundColor: "white"}}>
        <Image  src={logo} preview={false} />
        <SideMenu/>
      </Sider>
      <Layout>
        <Content style={{ backgroundColor: "#f2f2f2" }}>
          <Routes>
            <Route path="dashboard" element={<MainPainel/>}/>
            <Route path="classifications" element={<ClassificationList/>}/>
            <Route path="register-classification" element={<ClassificationRegister/>}/>
            <Route path="symptoms" element={<SymptomsList/>}/>
            <Route path="register-symptoms" element={<RegisterSymptom/>}/>
            <Route path="nurses" element={<NurseList/>}/>
            <Route path="register-nurse" element={<RegisterNurse/>}>
              <Route path=":nurseId" element={<RegisterNurse/>}/>
            </Route>
            <Route path="pdf" element={<GenerationPdf/>}/>
          </Routes>
        </Content>
        <Footer style={{textAlign: "center", backgroundColor: "white"}}>
          Sorask - Classificação de risco © 2022
        </Footer>
      </Layout>
    </Layout>
  )
}
