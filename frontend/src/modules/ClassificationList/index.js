import {Card, Table, Tag, Button} from 'antd';
import React, { useLayoutEffect } from "react";
import { Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

const { useState, useEffect } = React;

const ClassificationList = () => {
    const navigate = useNavigate()
    let [classification, setClassification] = useState([]);
    let [steste, setSteste] = useState({
        loading: true
    });
    useEffect(() => {
        fetch('http://192.168.1.17:5000/classification',{
            method: 'GET',
            headers: {'Content-Type': "application/json", 'out_date': 'true'}})
        .then(response => response.json())
        .then(data => getValues(data))
        .then(setSteste({loading: false}))
    }, []);

    
    let getValues = async (s) => {
        let classifications_formatted = []
        s.forEach(element => {
            classifications_formatted.push({
                "id": element.id,
                "name": element.patient.name,
                "nurse": element.nurse.name,
                "in": element.date_in,
                "out": element.date_out,
                "flag": element.flag
            })
        });
        setClassification(classifications_formatted)

    }
    const renderFlagStatus = (flagStatus) => {
        if (flagStatus === 1) {
            return <Tag color={'blue'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
        if (flagStatus === 2) {
            return <Tag color={'green'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
        if (flagStatus === 3) {
            return <Tag color={'yellow'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
        if (flagStatus === 4) {
            return <Tag color={'orange'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
        if (flagStatus === 5) {
            return <Tag color={'red'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
    }
    const goTo = (id) => {
        const value = classification.find(element => element.id == id)
        navigate(`/register-classification/${id}`,{state: value})
    }
    const edit = (id) => {
        return <Button  onClick={ () => goTo(id)}>Editar</Button>
    }
    const tableColumn = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Entrada',
            dataIndex: 'in',
            key: 'in'
        },
        {
            title: 'Saída',
            dataIndex: 'out',
            key: 'out'
        },
        {
            title: 'Profissional',
            dataIndex: 'nurse',
            key: 'nurse'
        },
        {
            title: 'Flag',
            dataIndex: 'flag',
            key: 'flag',
            render: renderFlagStatus
        },
        {
            title: 'Editar',
            dataIndex: 'id',
            key: 'id',
            render: edit
        },
    ];
    const addNewClassification = () => {
            return (<Link to={'/register-classification'}>
                <Button>Adicionar nova {'\u2800'} <FontAwesomeIcon icon={faFlag} /></Button>
            </Link>);
    }
    
    return (
        <Card title={"Classificações realizadas"} extra={addNewClassification()} style={{margin: 20}}>
            <Table
                dataSource={steste.loading ? [] : classification}
                columns={tableColumn}
                rowKey="id"
                pagination={{ pageSize: 12 }}
                onRow={(classItem)=> ({
                    onClick: () => console.log(classItem.id)
                })}
            />
        </Card>
    );
};

export default ClassificationList;