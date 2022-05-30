import { Card, Row, Col, Divider, Table, Tag} from 'antd';
import React, { Text } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { ComposedChart,LineChart, Line, AreaChart, Area, PieChart, Pie, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { useState, useEffect } = React;

const MainPainel = () => {

  var [classification, setClassification] = useState([]);
  var [steste, setSteste] = useState({
      loading: true
  });
  useEffect(() => {
      fetch('http://localhost:5000/report')
      .then(response => response.json())
      .then(data => getValues(data))
      .then(setSteste({loading: false}))
  }, []);

  
  let getValues = async (s) => {
      setClassification(s)

  }

    const data1 = [
        {
          name: 'Diarreia',
          sintoma: 2400
        },
        {
          name: 'Dor de Cabeça',
          sintoma: 3000
          
        }
        
      ];
    const data2 = [
        { name: 'Azul', value: 400 },
        { name: 'Verde', value: 300 },
        { name: 'Amarelo', value: 300 },
        { name: 'Laranja', value: 200 },
        { name: 'Vermelho', value: 80 }
    ];

    const data3 = [
        {
          name: '1',
          red: 450,
          blue: 320,
          orange: 28,
          yellow: 45,
          green:210
        },
        {
          name: '2',
          red:180,
          blue: 38,
          orange: 27,
          yellow: 89,
          green:230
        },
        {
          name: '3',
          red: 25,
          blue: 80,
          orange: 65,
          yellow: 1040,
          green:128
        },
        {
          name: '4',
          red: 10,
          blue: 45,
          orange: 12,
          yellow: 930,
          green:128
        },
        {
          name: '5',
          red: 3,
          blue: 120,
          orange: 14,
          yellow: 59,
          green:236
        },
        {
          name: '6',
          red: 1,
          blue: 6,
          orange: 1,
          yellow: 17,
          green:31
        },
        {
          name: '7',
          red: 4,
          blue: 19,
          orange: 5,
          yellow: 32,
          green:27
        },
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
            title: 'Flag',
            dataIndex: 'flag',
            key: 'flag',
            render: renderFlagStatus
        }
    ];
    
    const classificationss = [
        {
            "id": 1,
            "flag": 1,
            "name": "Lucas Tavares"
        },
        {
            "id": 2,
            "flag": 2,
            "name": "Alexandre Rangel"
        },
    ] 
      const data4 = [
        {
          name: '01/06',
          uv: 4000,
          sintoma: "Dor de Cabeça",
          pv: 2400,
          amt: 2400,
        },
        {
          name: '02/06',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: '03/06',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: '04/06',
          uv: 2780,
          pv: 3908,
          amt: "teste",
        },
        {
          name: '05/06',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: '06/06',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: '07/06',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
    ];
    const RADIAN = Math.PI / 180;
    const COLORS = ['#00BEE0', '#3CE157', '#EFE54A', '#E18E3C', '#df1e1e'];
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    return (
        <Card title={"Dashboard"} style={{margin: 20}}>
            <Row>
                <Col span={16}>
                <Row className='linha'>
                <Col span={12} className="BoxCard">
                    {/* GRID 1 */}
                    < div className="titleBox">Sintomas Frequêntes - Hoje</div>
                    <>
                    <ResponsiveContainer width="100%" height="80%" className="blockCard" >
                    <BarChart
                    width={500}
                    height={300}
                    data={data1}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    
                    <Bar dataKey="sintoma" stackId="a" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
                    </>
                </Col>
                <Col span={12} className="BoxCard">
                    {/* GRID 2 */}
                    < div className="titleBox">Complexidade de risco - Hoje</div>
                    <>
                        <ResponsiveContainer width="100%" height="80%" className="blockCard">
                            <PieChart width={400} height={400}>
                            <Pie
                                data={data2}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {data2.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                </Col>
            </Row>
            <Row className='linha'>
                <Col span={12} className="BoxCard">
                    {/* GRID 3 */}
                    < div className="titleBox">Sintomas Frequêntes - 7 dias</div>
                    <>
                    <ResponsiveContainer width="100%" height="80%" className="blockCard">
        <ComposedChart
          width={500}
          height={400}
          data={data4}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis dataKey="name" scale="band" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" barSize={20} fill="#413ea0" />
          <Bar dataKey="sintoma" barSize={0} fill="#413ea0" display={false}/>
        </ComposedChart>
      </ResponsiveContainer>
                    </>
                </Col>
                <Col span={12} className="BoxCard">
                    {/* GRID 4 */}
                    < div className="titleBox">Complexidade de risco - 7 dias</div>
                    <>
                    <ResponsiveContainer width="100%" height="80%" className="blockCard">
                        <AreaChart
                        width={500}
                        height={400}
                        data={data3}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip />
                        <Area type="monotone" dataKey="blue" stackId="1" stroke="#8884d8" fill="#00BEE0" />
                        <Area type="monotone" dataKey="green" stackId="1" stroke="#82ca9d" fill="#3CE157" />
                        <Area type="monotone" dataKey="yellow" stackId="1" stroke="#ffc658" fill="#EFE54A" />
                        <Area type="monotone" dataKey="orange" stackId="1" stroke="#ffc658" fill="#E18E3C" />
                        <Area type="monotone" dataKey="red" stackId="1" stroke="#ffc658" fill="#df1e1e" />

                        </AreaChart>
                    </ResponsiveContainer>
      </>
                </Col>
            </Row>

                </Col>
                <Col span={8}>
                <Card title={"Classificações realizadas"} style={{margin: 20}}>
                    <Table
                        dataSource={classificationss}
                        columns={tableColumn}
                        rowKey="id"
                        onRow={(classItem)=> ({
                            onClick: () => console.log(classItem.name)
                        })}
                    />
                </Card>
                </Col>
            </Row>
        </Card>
    );
};

export default MainPainel;