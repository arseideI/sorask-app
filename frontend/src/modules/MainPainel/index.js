import { Card, Row, Col, Divider, Table, Tag} from 'antd';
import React, { Text } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { ComposedChart,LineChart, Line, AreaChart, Area, PieChart, Pie, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const { useState, useEffect } = React;

const MainPainel = () => {

  var [classification, setClassification] = useState([]);
  var [Graph3, setGraph3] = useState([]);
  var [Graph1, setGraph1] = useState([]);
  var [Graph2, setGraph2] = useState([]);
  var [Graph4, setGraph4] = useState([]);
  var [steste, setSteste] = useState({
      loading: true
  });
  useEffect(() => {
      fetch('http://192.168.1.17:5000/dashboard')
      .then(response => response.json())
      .then(data => getValues(data))
      .then(setSteste({loading: false}))
  }, []);

  
  let getValues = async (s) => {
    let classifications_formatted = []
    let dia = 1
        s.graph3.forEach(element => {
            classifications_formatted.push({
                "casos": element.QNT,
                "name": dia,
                "sintoma": element.NM_SYMPTOM
            })
          dia += 1
        });
        
      setGraph3(classifications_formatted)
      let g1 =[]
      s.graph1.forEach(element => {
        g1.push({
            "casos": element.QNT,
            "sintoma": element.NM_SYMPTOM
        })
      dia += 1
    });
    setGraph1(g1)

    let g2 =[]
      s.graph2.forEach(element => {
        g2.push({
            "name": element.COLOR_NM.name,
            "value": element.VALUE,
            "color": element.COLOR_NM.color
        })
    });
    setGraph2(g2)

    let g4 =[]
      s.graph4.forEach(element => {
        g4.push({
            "name": element.COLOR_NM.name,
            "value": element.VALUE,
            "color": element.COLOR_NM.color
        })
    });
    setGraph4(g4)

    let cls =[]
      s.classification.forEach(element => {
        cls.push({
            "name": element.patient.name,
            "id": element.id,
            "flag": element.flag
        })
    });
    setClassification(cls)
  }
  const getPath = (x, y, width, height) => `M${x},${y + height}
  C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;

const TriangleBar = (props) => {
const { fill, x, y, width, height } = props;

return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

TriangleBar.propTypes = {
fill: PropTypes.string,
x: PropTypes.number,
y: PropTypes.number,
width: PropTypes.number,
height: PropTypes.number,
};
    const data1 = Graph1
    const data2 = Graph2;
    const data4 = Graph3

    const data3 = Graph4



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
        }
    ];
    
    const classificationss = classification
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
                    < div className="titleBox">Sintomas Frequentes - 24 Horas</div>
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
                    <XAxis dataKey="qnt" />
                    <YAxis />
                    <Tooltip />
                    
                    <Bar dataKey="casos" stackId="a" fill="#e09753" />
                    <Bar dataKey="sintoma" stackId="a" fill="#413ea0" display={'none'}/>
                    
                    </BarChart>
                </ResponsiveContainer>
                    </>
                </Col>
                <Col span={12} className="BoxCard">
                    {/* GRID 2 */}
                    < div className="titleBox">Complexidade de risco - 24 Horas</div>
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
                                <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </>
                </Col>
            </Row>
            <Row className='linha'>
                <Col span={12} className="BoxCard">
                    {/* GRID 3 */}
                    < div className="titleBox">Sintomas Frequentes - 7 dias</div>
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
          <Bar dataKey="casos" barSize={20} fill="#53c18e" />
        
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
        <BarChart
          width={500}
          height={300}
          data={data3}
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
          <Bar dataKey="value" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
            {data3.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          
        </BarChart>
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
                        pagination={{ pageSize: 8 }}
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