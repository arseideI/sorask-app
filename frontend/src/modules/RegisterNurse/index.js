import { Card, Form, Input, Row, Col, Divider, Select, Button, Radio, Checkbox, message } from 'antd';
import { Routes, Route, useNavigate } from 'react-router-dom';
import React, { useLayoutEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const RegisterNurse = () => {
    const navigate = useNavigate()
    const onFinish = (values) => {
        fetch('http://192.168.1.17:5000/nurse', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(values)
        }).then(()=>{
            console.log("Request Realizado com sucesso")
            message
                .loading('Cadastrando profissional...', 2.5)
                .then(() => message.success('Cadastro realizado com sucesso!', 2.5))
                .then(()=> navigate('/nurses'))
        })
      };
    return(
        <Card title={"Cadastro de profissional"} style={{margin: 20}}>
             <Form layout='vertical' onFinish={onFinish}>
                <Row>
                    <Col span={6}>
                    <Form.Item
                        label="Nome"
                        name="name"
                        rules={[{ required: true, message: 'Insira o nome!' }]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col span={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Insira o email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    </Col>
                    <Col span={6}>
                    <Form.Item
                        label="Senha"
                        name="password"
                        rules={[{ required: true, message: 'Insira a senha!' }]}
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