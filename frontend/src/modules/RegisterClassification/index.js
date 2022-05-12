import { Card, Form, Input, Row, Col, Divider, Select, Button, Radio, Checkbox } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const { Option } = Select;

const ClassificationRegister = () => {
    const patients = [

        <Option key={1} value='1$Lucas Tavares$1772345434'>Lucas Tavares | 1772345434</Option>,
        <Option key={2} value='2$Thaís Tavares$4534213234'>Thaís Tavares | 4534213234</Option>,
        <Option key={3} value='3$Alexandre Rangel$460798456'>Alexandre Rangel | 460798456</Option>,
        <Option key={4} value='4$Susy Anne Ramos$5634398549'>Susy Anne Ramos | 5634398549</Option>
        
        ]
    const children = [

        <Option key={1} value='1$Dor abdominal superior'>Dor abdominal superior</Option>,
        <Option key={2} value='2$Dor abdominal inferior'>Dor abdominal inferior</Option>,
        <Option key={3} value='3$Abuso de álcool'>Abuso de álcool</Option>,
        <Option key={4} value='4$Ansiedade (nervosismo)'>Ansiedade (nervosismo)</Option>,
        <Option key={5} value='5$Dor de braço ou dor'>Dor de braço ou dor</Option>,
        <Option key={6} value='6$Dor nas costas ou dor'>Dor nas costas ou dor</Option>,
        <Option key={7} value='7$Tendência de sangramento'>Tendência de sangramento</Option>,
        <Option key={8} value='8$Sangue em vômito'>Sangue em vômito</Option>,
        <Option key={9} value='9$Dor ou dor da mama'>Dor ou dor da mama</Option>,
        <Option key={10} value='10$Pressão torácica'>Pressão torácica</Option>,
        <Option key={11} value='11$Arrepios'>Arrepios</Option>,
        <Option key={12} value='12$Mudança de comportamento'>Mudança de comportamento</Option>,
        <Option key={13} value='13$Tosse'>Tosse</Option>,
        <Option key={14} value='14$Depressivo'>Depressivo</Option>,
        <Option key={15} value='15$Tontura'>Tontura</Option>,
        <Option key={16} value='16$Visão dupla (Diplopia)'>Visão dupla (Diplopia)</Option>,
        <Option key={17} value='17$Pressão da orelha'>Pressão da orelha</Option>,
        <Option key={18} value='18$Dor no ouvido'>Dor no ouvido</Option>,
        <Option key={19} value='19$Dor nos olhos (irritação)'>Dor nos olhos (irritação)</Option>,
        <Option key={20} value='20$Dor facial'>Dor facial</Option>,
        <Option key={21} value='21$Desmaiar'>Desmaiar</Option>,
        <Option key={22} value='22$Febre'>Febre</Option>,
        <Option key={23} value='23$Febre no viajante que retorna'>Febre no viajante que retorna</Option>,
        <Option key={24} value='24$Febre de origem desconhecida'>Febre de origem desconhecida</Option>,
        <Option key={25} value='25$Dor de flanco'>Dor de flanco</Option>,
        <Option key={26} value='26$Micção frequente (frequência)'>Micção frequente (frequência)</Option>,
        <Option key={27} value='27$Delírios ou alucinações'>Delírios ou alucinações</Option>,
        <Option key={28} value='28$Dor de cabeça'>Dor de cabeça</Option>,
        <Option key={29} value='29$Urticária'>Urticária</Option>,
        <Option key={30} value='30$Hipotermia (baixa temperatura)'>Hipotermia (baixa temperatura)</Option>,
        <Option key={31} value='31$Incontinência (urina com vazamento)'>Incontinência (urina com vazamento)</Option>,
        <Option key={32} value='32$Insônia (problemas para dormir)'>Insônia (problemas para dormir)</Option>,
        <Option key={33} value='33$Coceira na pele'>Coceira na pele</Option>,
        <Option key={34} value='34$Dor nos rins (dor de flanco)'>Dor nos rins (dor de flanco)</Option>,
        <Option key={35} value='35$Dor na perna ou dor'>Dor na perna ou dor</Option>,
        <Option key={36} value='36$Inchaço das duas pernas'>Inchaço das duas pernas</Option>,
        <Option key={37} value='37$Letargia (lentidão)'>Letargia (lentidão)</Option>,
        <Option key={38} value='38$Dor na boca'>Dor na boca</Option>,
        <Option key={39} value='39$Dor muscular'>Dor muscular</Option>,
        <Option key={40} value='40$Sangramento nasal'>Sangramento nasal</Option>,
        <Option key={41} value='41$Dor no pescoço ou dor'>Dor no pescoço ou dor</Option>,
        <Option key={42} value='42$Inchaço do pescoço'>Inchaço do pescoço</Option>,
        <Option key={43} value='43$Dormência'>Dormência</Option>,
        <Option key={44} value='44$Obesidade'>Obesidade</Option>,
        <Option key={45} value='45$Overdose'>Overdose</Option>,
        <Option key={46} value='46$Pulsações cardíacas e palpitações'>Pulsações cardíacas e palpitações</Option>,
        <Option key={47} value='47$Envenenamento'>Envenenamento</Option>,
        <Option key={48} value='48$Irritação na pele'>Irritação na pele</Option>,
        <Option key={49} value='49$Apreensão'>Apreensão</Option>,
        <Option key={50} value='50$Falta de ar'>Falta de ar</Option>,
        <Option key={51} value='51$Dor no ombro ou dor'>Dor no ombro ou dor</Option>,
        <Option key={52} value='52$Dor e pressão do seio'>Dor e pressão do seio</Option>,
        <Option key={53} value='53$Dor de garganta'>Dor de garganta</Option>,
        <Option key={54} value='54$Problema de fala'>Problema de fala</Option>,
        <Option key={55} value='55$Abuso de substâncias (abuso de drogas)'>Abuso de substâncias (abuso de drogas)</Option>,
        <Option key={56} value='56$Problema de engolir (disfagia)'>Problema de engolir (disfagia)</Option>,
        <Option key={57} value='57$Trauma'>Trauma</Option>
    ];
    function handleChange(value) {
        }
    const onFinish = (values) => {
        console.log('Success=====================:', JSON.stringify(values));
        fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {'Content-Type': "application/json"},
            body: JSON.stringify(values)
        }).then(()=>{
            console.log("Request Realizado com sucesso")
        })
      };
    return (
        <Card title={"Nova Classificação"} style={{ margin: 20 }}>
            <Form layout='vertical' onFinish={onFinish}>
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
                                        {patients}
                                    </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
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
                                    {children}
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
                                <Input placeholder='Temperatura em ºC' />
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
                    <Col span={10}>
                        <Row>
                            <Col span={20} className="flags">
                            <Form.Item
                                name="flags"
                                label="Vulnerabilidade / Classificação"
                                rules={[{ required: true, message: 'Selecione um' }]}
                            >
                                <Radio.Group>
                                <Radio.Button value="a" style={{color: "#00BEE0", borderColor: "#00BEE0"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="b" style={{color: "#3CE157", borderColor: "#3CE157"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="c" style={{color: "#EFE54A", borderColor: "#EFE54A"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="d" style={{color: "#E18E3C", borderColor: "#E18E3C"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                <Radio.Button value="e" style={{color: "#E13C3C", borderColor: "#E13C3C"}}><FontAwesomeIcon icon={faFlag} /></Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20} className="labelTitle">
                            <Form.Item name="internal" label="Encaminhamento Interno">
                                <Radio.Group>
                                <Radio value="a">Liberar Paciênte</Radio>
                                <Radio value="b" Checked>Encaminhar para Atendimento</Radio>
                                </Radio.Group>
                            </Form.Item>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={20} className="labelTitle">
                            <Form.Item name="setor" label="Setor">
                                <Checkbox.Group>
                                    <Checkbox value="A" style={{ lineHeight: '32px' }}>Curativo</Checkbox>
                                    <Checkbox value="B" style={{ lineHeight: '32px' }}>Nebulização</Checkbox>
                                    <Checkbox value="C" style={{ lineHeight: '32px' }}>Atendimento Médico</Checkbox>
                                    <Checkbox value="D" style={{ lineHeight: '32px' }}>Vacina</Checkbox>
                                    <Checkbox value="E" style={{ lineHeight: '32px' }}>Exames</Checkbox>
                                    <Checkbox value="F" style={{ lineHeight: '32px' }}>Odontologia</Checkbox>
                                    <Checkbox value="G" style={{ lineHeight: '32px' }}>Procedimentos</Checkbox>
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