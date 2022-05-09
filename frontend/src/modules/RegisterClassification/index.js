import {Card, Form, Input, Button, InputNumber, Divider, Select} from 'antd';

const { Option } = Select;

const ClassificationRegister = () => {
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
        console.log(`selected ${value}`);
      }
    return (
        <Card title={"Nova Classificação"} style={{margin: 20}}>
            <Form>
                <Form.Item label="Número CNS" required>
                    <Input placeholder='Número da CNS do paciente'/>
                </Form.Item>
                <Divider/>
                <Form.Item label="Motívo da consulta" required>
                <>
    <Select
      mode="multiple"
      allowClear
      style={{ width: '100%' }}
      placeholder="Selecione os sintomas"
      onChange={handleChange}
    >
      {children}
    </Select>
    
  </>
                </Form.Item>
            </Form>
            
        </Card>
    );
};

export default ClassificationRegister;