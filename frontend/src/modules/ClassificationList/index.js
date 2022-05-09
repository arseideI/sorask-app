import {Card, Table, Tag, Button} from 'antd';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFlag } from '@fortawesome/free-solid-svg-icons'


const ClassificationList = () => {
   const classification = [
        {id: 1, name: "Lucas Tavares", in:"14:32 02/05/2022", nurse: "Sona", flag: 0},
        {id: 2, name: "Thaís Tavares", in:"14:32 02/05/2022", nurse: "Soraka", flag: 2},
        {id: 2, name: "Ashley Abravanel", in:"14:32 02/05/2022", nurse: "Yuumi Cat", flag: 3}
    ];
    const renderFlagStatus = (flagStatus) => {
        if (flagStatus === 0) {
            return <Tag color={'blue'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
        if (flagStatus === 1) {
            return <Tag color={'green'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
        if (flagStatus === 2) {
            return <Tag color={'yellow'}><FontAwesomeIcon icon={faFlag} /></Tag>
        }
        if (flagStatus === 3) {
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
            title: 'Entrada',
            dataIndex: 'in',
            key: 'in'
        },
        {
            title: 'Enfermeira',
            dataIndex: 'nurse',
            key: 'nurse'
        },
        {
            title: 'Flag',
            dataIndex: 'flag',
            key: 'flag',
            render: renderFlagStatus
        }
    ];
    const addNewClassification = () => {
            return (<Link to={'register-classification'}>
                <Button>Adicionar nova {'\u2800'} <FontAwesomeIcon icon={faFlag} /></Button>
            </Link>);
    }
    
    return (
        <Card title={"Classificações realizadas"} extra={addNewClassification()} style={{margin: 20}}>
            <Table
                dataSource={classification}
                columns={tableColumn}
                rowKey="id"
                onRow={(classItem)=> ({
                    onClick: () => console.log(classItem.name)
                })}
            />
        </Card>
    );
};

export default ClassificationList;