import React, { useEffect, useState, useContext} from "react";
import { Card, Form, Input, Row, Col, Divider, Select, Button, Radio, Checkbox, message, Image } from 'antd';
import logo from '../../assets/img/logo.jpg'

import { AuthContext } from "../../contexts/auth";

const Login = () =>{
    const {authenticated, login} = useContext(AuthContext)
    const [access, setAccess] = useState(null)
    const [submit, setSubmit] = useState(null)
    
    const onFinish = (u) => {
        login(u.email, u.password)
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return(
        <Row className="LoginRow">
            <Col span={9}></Col>
            <Col span={12}>
                <Row>
                    <Col span={12}><Image  src={logo} preview={false} ali /></Col>
                    <>{String(authenticated)}</>
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
                    
                    </Col>
                </Row>
            </Col>

            <Col span={6}></Col>

        </Row>
    );
}

export default Login