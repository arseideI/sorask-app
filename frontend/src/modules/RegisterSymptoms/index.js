import { Card, Form, Input, Row, Col, Divider, Select, Button, Radio, Checkbox, message } from 'antd';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const RegisterSymptom = () => {
    const navigate = useNavigate()
    let [symptom, setSymptom] = useState({});
    let params = useParams();
    let requestId = parseInt(params.symptomId)
    let [steste, setSteste] = useState({
        loading: true
    });
    let getValues = async (s) => {
        setSymptom(s)
    }
    useEffect(() => {
        if(requestId){
            fetch(`http://192.168.1.17:5000/symptom/${requestId}`, {
            method: 'GET',
            headers: {'Content-Type': "application/json", "Access-Control-Allow-Origin": "*"}
        }).then(response => response.json())
        .then(data => getValues(data))
        .then(setSteste({loading: false}))
        }
        
    }, []);
    const onFinish = (values) => {
        if(requestId){
            fetch(`http://192.168.1.17:5000/symptom/${requestId}`, {
            method: 'PUT',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(values)
        }).then(()=>{
            console.log("Request Realizado com sucesso")
            message
                .loading('Atualizando Sintoma...', 2.5)
                .then(() => message.success('Atualização realizada com sucesso!', 2.5))
                .then(()=> navigate('/symptoms'))
        })
        }else{
            fetch('http://192.168.1.17:5000/symptom', {
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
        }
      };
    return(
        <Card title={"Cadastro de sintomas"} style={{margin: 20}}>
             <Form layout='vertical' onFinish={onFinish} fields={[
                 {
                     name: ['name'],
                     value: symptom ? symptom.NM_SYMPTOM : null
                 },
                 {
                    name: ['flag'],
                    value: symptom ? String(symptom.ID_FLAG) : null
                },
             ]}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Sintoma" name="name">
                            <Input placeholder='Nome do sintoma' />
                        </Form.Item>
                    </Col>
                    <Col span={12} className="flags">
                            <Form.Item
                                name="flag"
                                label="Peso | Flag"
                                rules={[{ required: true, message: 'Selecione um' }]}
                            >
                                <Radio.Group id="VRTSB">
                                <Radio.Button value="1" style={{color: "#00BEE0", borderColor: "#00BEE0"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="2" style={{color: "#3CE157", borderColor: "#3CE157"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="3" style={{color: "#EFE54A", borderColor: "#EFE54A"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="4" style={{color: "#E18E3C", borderColor: "#E18E3C"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="5" style={{color: "#E13C3C", borderColor: "#E13C3C"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                </Radio.Group>
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

export default RegisterSymptom;