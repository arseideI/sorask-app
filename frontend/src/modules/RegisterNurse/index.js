import { Card, Form, Input, Row, Col, Divider, Select, Button, Radio, Checkbox, message } from 'antd';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import React, { use } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const { useState, useEffect } = React;

const RegisterNurse = () => {
    const navigate = useNavigate()
    const location = useLocation();
    let [nurse, setNurse] = useState({});
    let [steste, setSteste] = useState({
        loading: true
    });
    let params = useParams();
    let requestId = parseInt(params.nurseId)
    let getValues = async (s) => {
        setNurse(s)
    }
    useEffect(() => {
        fetch(`http://192.168.1.17:5000/nurse/${requestId}`, {
            method: 'GET',
            headers: {'Content-Type': "application/json", "Access-Control-Allow-Origin": "*"}
        }).then(response => response.json())
        .then(data => getValues(data))
        .then(setSteste({loading: false}))
    }, []);
    
    const onFinish = (values) => {
        if(requestId){
            fetch(`http://192.168.1.17:5000/nurse/${requestId}`, {
            method: 'PUT',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(values)
        }).then(()=>{
            console.log("Request Realizado com sucesso")
            message
                .loading('Atualizando profissional...', 2.5)
                .then(() => message.success('Atualização realizada com sucesso!', 2.5))
                .then(()=> navigate('/nurses'))
        })
        }else{

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
        }
      };
    return(
        <Card title={"Cadastro de profissional"} style={{margin: 20}}>
             <Form layout='vertical' onFinish={onFinish} fields={[
                 {
                    name:["name"], 
                    value: nurse ? nurse.name: null
                 },
                 {
                    name:["email"], 
                    value: nurse ? nurse.email: null
                 },
                 ]}>
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
                        <Input/>
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