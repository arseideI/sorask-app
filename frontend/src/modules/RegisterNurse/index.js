import { Card, Form, Input, Row, Col, Divider, Select, Button, Radio, Checkbox, message } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useLayoutEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const RegisterNurse = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        fetch('http://localhost:5000/symptom', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(values)
        }).then(()=>{
            console.log("Request Realizado com sucesso")
            message
                .loading('Cadastrando Sintoma...', 2.5)
                .then(() => message.success('Cadastro realizado com sucesso!', 2.5))
                .then(()=> navigate('/symptoms'))
        })
      };
    return(
        <Card title={"Cadastro de profissional"} style={{margin: 20}}>
             <Form layout='vertical' onFinish={onFinish}>
                <Row>
                    <Col span={6}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>   
                    </Col>
                </Row>
                <Form.Item >
                    <Button type='primary' htmlType="submit">Salvar</Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default RegisterNurse;