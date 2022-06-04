import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout, Image } from 'antd';
import logo from '../../assets/img/logo.jpg'


import ClassificationList from '../ClassificationList';
import ClassificationRegister from '../RegisterClassification';
import MainPainel from '../MainPainel';
import SideMenu from '../../components/SideMenu';
import SymptomsList from '../SymptomsList';
import RegisterSymptom from '../RegisterSymptoms';
import RegisterNurse from '../RegisterNurse';
import NurseList from '../NurseList';
import GenerationPdf from '../GenerationPdf';

const { Sider, Content, Footer, Header } = Layout;

const DefaultDash = ({children}) =>{

    return(
        <Layout style={{flexDirection: "row"}}>
      <Sider style={{ height: "100vh", backgroundColor: "white"}}>
        <Image  src={logo} preview={false} />
        <SideMenu/>
      </Sider>
      <Layout>
        <Content style={{ backgroundColor: "#f2f2f2" }}>
            {children}
        </Content>
        <Footer style={{textAlign: "center", backgroundColor: "white"}}>
          Sorask - Classificação de risco © 2022
        </Footer>
      </Layout>
    </Layout>
    );
}

export default DefaultDash;