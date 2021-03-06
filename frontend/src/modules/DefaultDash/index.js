import React, {useContext} from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Layout, Image, Button, Col, Row } from 'antd';
import logo from '../../assets/img/logo.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { AuthContext } from '../../contexts/auth';

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
    const {logout, user} = useContext(AuthContext)
    const handleLogout = ()=>{
      logout()
    }
    return(
        <Layout style={{flexDirection: "row"}}>
      <Sider style={{ height: "100vh", backgroundColor: "white"}}>
        <Image  src={logo} preview={false} />
        <SideMenu/>
      </Sider>
      <Layout>
        <Header style={{backgroundColor:"#FFFFFF" }}>
            <Row>
            <Col className='userName'>
                <>Olá, <span>{user.name} | {user.type}</span></>
              </Col>
              <Col span={15}>
              
              </Col>
              <Col span={2}>
              <Button onClick={handleLogout}><FontAwesomeIcon icon={faRightFromBracket} />{'\u2800'} Sair</Button>
            
              </Col>
              
            </Row>
        </Header>
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