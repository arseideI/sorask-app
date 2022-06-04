import { Card, Form, Input,InputNumber, Row, Col, Divider, Select, Button, Radio, Checkbox, message} from 'antd';
import React, { useLayoutEffect } from "react";
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const { useState, useEffect } = React;

const { Option } = Select;

const ClassificationRegister = () => {
    console.log("Enfermeira: ", localStorage.getItem('user'))
    let params = useParams();
    let requestId = parseInt(params.classificationId)
    const navigate = useNavigate()
    let [symptoms, setSymptoms] = useState([]);
    let [flag, setFlag] = useState(null);
    let [steste, setSteste] = useState({
        loading: true
    });
    let [classification, setClassification] = useState({})
    let [patients, setPatients] = useState([])
    let [selectSymptom, setSelectSymptom] = useState();
    useEffect(() => {
        if (requestId){

        fetch(`http://192.168.1.17:5000/classification/${requestId}`, {
            method: 'GET',
            headers: {'Content-Type': "application/json", "Access-Control-Allow-Origin": "*"}
        }).then(response => response.json())
        .then(data => getClassification(data))
        .then(setSteste({loading: false}))
        }
    }, []);

    const getClassification = (s) =>{
        s.name = ""+s.patient.id+"$"+s.patient.name+"$"+s.patient.cns+""
        setFlag(s.flag)
        setClassification(s)
    }
    useEffect(() => {
        fetch('http://192.168.1.17:5000/classification/form')
        .then(response => response.json())
        .then(data => getValues(data))
        .then(setSteste({loading: false}))
        
    }, []);

    
    let getValues = async (s) => {
        let symptom_list = []
        let patient_list = []
        s.patients.forEach(element => {
            let values = "" + element.id + ""
            patient_list.push(<Option key={element.id} value={values}>{element.name}</Option>)
        });
        setPatients(patient_list)

        s.symptoms.forEach(element => {
            let values = "" + element.id + ""
            symptom_list.push(<Option key={element.id} value={values}>{element.name}</Option>)
        });
        setSymptoms(symptom_list)

    }
    
    function handleChange(value) {
        var indicator = 0
        if (value.length == 0){
            setFlag("0")
        }
        value.forEach(flag_hash => {
                let text = flag_hash.split("$")
                let flagValue = parseInt(text[2])
                
                if (flagValue > indicator){
                    indicator = flagValue
                }
                
                setFlag(String(indicator))
                
            });
        }
    
  
    const onFinish = (values) => {
        const user_data = JSON.parse(localStorage.getItem('user'))

        values.id_nurse = user_data.id
        if(requestId){
        fetch(`http://192.168.1.17:5000/classification/${requestId}`, {
            method: 'PUT',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(values)
        }).then(()=>{
            console.log("Request Realizado com sucesso")
            message
                .loading('Atualizando classificação...', 2.5)
                .then(() => message.success('Atualização realizada com sucesso!', 2.5))
                .then(()=> navigate('/classifications'))
        })
        }else{
            fetch('http://192.168.1.17:5000/classification', {
                method: 'POST',
                headers: {'Content-Type': "application/json"},
                body: JSON.stringify(values)
            }).then(()=>{
                console.log("Request Realizado com sucesso")
                message
                    .loading('Cadastrando classificação...', 2.5)
                    .then(() => message.success('Cadastro realizado com sucesso!', 2.5))
                    .then(()=> navigate('/classifications'))
            })
        }
      };
    return (
        <Card title={"Classificação de paciente"} style={{ margin: 20 }}>
            <Form layout='vertical' onFinish={onFinish} fields={[
                 {
                    name:["flags"], 
                    value: flag ? String(flag) : null
                 },
                 {
                    name:["symptoms"], 
                    value: classification ? classification.symptoms : null
                 },
                 {
                    name:["internal"], 
                    value: classification ? String(classification.internal) : null
                 },
                 {
                    name:["oxygen"], 
                    value: classification ? classification.oxygen : null
                 }, 
                 {
                    name:["heart"], 
                    value: classification ? classification.heart : null
                 },
                 {
                    name:["respiratory"], 
                    value: classification ? classification.respiratory : null
                 }, 
                 {
                    name:["temperature"], 
                    value: classification ? classification.temperature : null
                 }, 
                 {
                    name:["arterial"], 
                    value: classification ? classification.arterial : null
                 },
                 {
                    name:["setor"], 
                    value: classification ? [String(classification.setor)] : null
                 },
                 {
                    name:["user"], 
                    value: classification ? classification.name : null
                 },
                 {
                    name:["observation"], 
                    value: classification ? classification.observation : null
                 },
                 ]}>
                <Row>
                    <Col span={12}>
                        <Form.Item label="Número CNS ou Nome" required name="user" >
                        <Select
                            showSearch
                            placeholder="Digite o nome ou o numero da cns"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            filterSort={(optionA, optionB) =>
                            optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                            }
                        >
                                        {steste.loading ? [] : patients}
                                    </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider className='divisor'/>
                <Row>
                    <Col span={12}>
                        <Row>
                        <Col span={20} className="labelTitle">
                            <Form.Item label="Classificação"  required name="symptoms">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder="Selecione os sintomas"
                                    onChange={handleChange}
                                >
                                    {steste.loading ? [] : symptoms}
                                </Select>

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={6} >
                            <Form.Item label="Pressão Arterial" name="arterial">
                                <Input placeholder='Pressão em mmHg' />
                            </Form.Item>

                            </Col>
                        <Col span={6}>
                            <Form.Item label="Temperatura" name="temperature">
                                <Input placeholder='Temperatura em ºC'/>
                            </Form.Item>
                            
                            
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Frequência Respiratória" name="respiratory">
                                <Input placeholder='Frequência em mpm' />
                            </Form.Item>
                        </Col>
                    </Row>
                    
                <Row>
                    <Col span={8}>
                            <Form.Item label="Frequência Cardiaca" name="heart">
                                <Input placeholder='Frequência em bpm' />
                            </Form.Item>
                    </Col>
                    <Col span={8}>
                            <Form.Item label="Saturação Oxigênio" name="oxygen">
                                <Input placeholder='Saturação em %' />
                            </Form.Item>
                    </Col>
                </Row>
                    
                <Row>
                    <Col span={20}>
                            <Form.Item label="Adicionar observações" name="observation">
                                <Input.TextArea rows={4}/>
                            </Form.Item>
                    </Col>
                </Row>
                    </Col>
                    <Col span={12}>
                        <Row>
                            <Col span={20} className="flags">
                            <Form.Item
                                name="flags"
                                label="Vulnerabilidade / Classificação"
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
                        <Row>
                            <Col span={20} className="labelTitle">
                            <Form.Item name="internal" label="Encaminhamento Interno">
                                <Radio.Group>
                                <Radio value="1">Liberar Paciênte</Radio>
                                <Radio value="2" Checked>Encaminhar para Atendimento</Radio>
                                </Radio.Group>
                            </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={20} className="labelTitle">
                            <Form.Item name="setor" label="Setor">
                                <Checkbox.Group>
                                    <Checkbox value="1" style={{ lineHeight: '32px' }}>Curativo</Checkbox>
                                    <Checkbox value="2" style={{ lineHeight: '32px' }}>Nebulização</Checkbox>
                                    <Checkbox value="3" style={{ lineHeight: '32px' }}>Atendimento Médico</Checkbox>
                                    <Checkbox value="4" style={{ lineHeight: '32px' }}>Vacina</Checkbox>
                                    <Checkbox value="5" style={{ lineHeight: '32px' }}>Exames</Checkbox>
                                    <Checkbox value="6" style={{ lineHeight: '32px' }}>Odontologia</Checkbox>
                                    <Checkbox value="7" style={{ lineHeight: '32px' }}>Procedimentos</Checkbox>
                                </Checkbox.Group>
                            </Form.Item>
                            </Col>
                            
                        </Row>
                    </Col>
                    
                </Row>
                
                
                <Form.Item >
                    <Button type='primary' htmlType="submit">Salvar</Button>
                </Form.Item>
            </Form>

        </Card>
    );
};
export default ClassificationRegister;