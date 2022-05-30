import {Card, Table, Tag, Button, Popconfirm, message} from 'antd';
import React, { useLayoutEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserNurse, faTrashCan } from '@fortawesome/free-solid-svg-icons'

const { useState, useEffect } = React;


const NurseList = () => {
    const navigate = useNavigate()
    let [classification, setClassification] = useState([]);
    let [deletest, setDeletest] = useState();
    let [steste, setSteste] = useState({
        loading: true
    });
    useEffect(() => {
        fetch('http://192.168.1.17:5000/nurse')
        .then(response => response.json())
        .then(data => getValues(data))
        .then(setSteste({loading: false}))
    }, []);

    
    let getValues = async (s) => {
        let classifications_formatted = []
        s.forEach(element => {
            classifications_formatted.push({
                "id": element.id,
                "name": element.name,
                "email": element.email,
                "type": element.type,
                "delete": element.id
            })
        });
        setClassification(classifications_formatted)

    }
    const deleteNurse = (id) => {
        const path = 'http://192.168.1.17:5000/nurse/'+id
        fetch(path, {
            method: 'DELETE',
            headers: {'Content-Type': "application/json"},
        }).then(()=>{
            console.log("Request Realizado com sucesso")
            navigate('/nurses')
        })
      };
    const confirm = (e) => {
        let del = deleteNurse(deletest)
        console.log("deletando: ", del)
        message.success('Deletado com sucesso');
        window.location.reload();
        
      };
      
      const cancel = (e) => {
        
        message.error('Delete cancelado');
      };
    const buttonDelete = (deleteId) =>{

        return<Popconfirm
        title="Tem certeza que deseja deletar?"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
        id={deleteId}
      >
        <a href="#" className='botaoDelete'><Button>Deletar {'\u2800'} <FontAwesomeIcon icon={faTrashCan} /></Button></a>
      </Popconfirm>
    }
    const tableColumn = [
        {
            title: 'Nome',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email'
        },
        {
            title: 'Cargo',
            dataIndex: 'type',
            key: 'type'
        },
        {
            title: 'Deletar',
            dataIndex: 'delete',
            key: 'delete',
            render: buttonDelete
        },

    ];
    const addNewClassification = () => {
            return (<Link to={'/register-nurse'}>
                <Button>Adicionar profissional {'\u2800'} <FontAwesomeIcon icon={faUserNurse} /></Button>
            </Link>);
    }
    
    return (
        <Card title={"Profissionais"} extra={addNewClassification()} style={{margin: 20}}>
            <Table
                dataSource={steste.loading ? [] : classification}
                columns={tableColumn}
                rowKey="id"
                onRow={(classItem)=> ({
                    onClick: () => {
                        console.log(classItem.id)
                        setDeletest(classItem.id)
                    }
                })}
            />
        </Card>
    );
}

export default NurseList;