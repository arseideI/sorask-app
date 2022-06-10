import React, { useEffect, useState, useContext} from "react";
import {Alert,Layout, Card, Form, Input, Row, Col, Divider, Select, Button, Radio, Checkbox, message, Image } from 'antd';
import logo from '../../assets/img/logo.jpg'

import { AuthContext } from "../../contexts/auth";
const { Sider, Content, Footer, Header } = Layout;

const Login = () =>{
    const {authenticated, login} = useContext(AuthContext)
    const [access, setAccess] = useState(null)
    const [submit, setSubmit] = useState(null)

    
    const onFinish = async (u) => {
        setTimeout(()=> setAccess("Dados incorretos"), 2000)
        const response  = await login(u.email, u.password)
        
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <Layout style={{ background: "#FFFFFF"}}>
             <Content>
             <Row className="LoginRow">
                        <Col span={9}></Col>
                        <Col span={12}>
                            <Row>
                                <Col span={12}><Image  src={logo} preview={false} ali /></Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                <Form
                                    name="basic"
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    >
                                    <Form.Item
                                        name="email"
                                        rules={[{ required: true, message: 'Insira seu email' }]}
                                    >
                                        <Input placeholder="Insira seu Email" />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                    
                                        rules={[{ required: true, message: 'Insira sua senha' }]}
                                    >
                                        <Input.Password  placeholder="Insira sua senha"/>
                                    </Form.Item>
                                
                                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                        
                                        <Button type="primary" htmlType="submit">
                                        Logar
                                        </Button>
                                    </Form.Item>
                                    </Form>
                                    {access? <Alert message="Dados incorretos!" type="error" />: <></>}
                                </Col>
                            </Row>
                        </Col>

                        <Col span={6}></Col>
                    </Row> 
            </Content>       
            <Footer style={{ textAlign: 'center', position: "absolute", bottom: "0px", width: "100%"}}>Sorask - Classificação de risco © 2022</Footer>
        </Layout>
    );
}

export default Login