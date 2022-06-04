import {Card, Table, Tag, Button} from 'antd';
import React, { useLayoutEffect } from "react";

import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag, faSyringe } from '@fortawesome/free-solid-svg-icons'

const { useState, useEffect } = React;


const SymptomsList = () => {
    const navigate = useNavigate()
    let [classification, setClassification] = useState([]);
    let [steste, setSteste] = useState({
        loading: true
    });
    useEffect(() => {
        fetch('http://192.168.1.17:5000/symptom')
        .then(response => response.json())
        .then(data => getValues(data))
        .then(setSteste({loading: false}))
    }, []);

    
    let getValues = async (s) => {
        let classifications_formatted = []
        s.forEach(element => {
            classifications_formatted.push({
                "id": element.ID_SYMPTOM,
                "name": element.NM_SYMPTOM,
                "flag": element.ID_FLAG
            })
        });
        setClassification(classifications_formatted)

    }
    const goTo = (id) => {
        const value = classification.find(element => element.id == id)
        navigate(`/register-symptoms/${id}`,{state: value})
    }
    const edit = (id) => {
        return <Button  onClick={ () => goTo(id)}>Editar</Button>
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
        console.log(flagStatus)
    }
   
    const tableColumn = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
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
        }
    ];
    const addNewClassification = () => {
            return (<Link to={'/register-symptoms'}>
                <Button>Adicionar sintoma {'\u2800'} <FontAwesomeIcon icon={faSyringe} /></Button>
            </Link>);
    }
    
    return (
        <Card title={"Sintomas Cadastrados"} extra={addNewClassification()} style={{margin: 20}}>
            <Table
                dataSource={steste.loading ? [] : classification}
                columns={tableColumn}
                rowKey="id"
                pagination={{ pageSize: 9 }}
                onRow={(classItem)=> ({
                    onClick: () => console.log(classItem.name)
                })}
            />
        </Card>
    );
}

export default SymptomsList;