import { Card, Row, Col, Divider} from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-solid-svg-icons';
import { PieChart, Pie, Sector, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MainPainel = () => {
    const data1 = [
        {
          name: 'Diarreia',
          amt: 2400
        },
        {
          name: 'Dor de Cabeça',
          sintoma: 3000
          
        }
        
      ];
    const data2 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 }
    ];
    const RADIAN = Math.PI / 180;
    const COLORS = ['#00BEE0', '#3CE157', '#EFE54A', '#E18E3C'];
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };
    return (
        <Card title={"Dashboard"} style={{margin: 20}}>
            <Row className='linha'>
                <Col span={12}>
                <ResponsiveContainer width="100%" height="100%">
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
                    <Legend />
                    <Bar dataKey="sintoma" stackId="a" fill="#8884d8" />
                    <Bar dataKey="amt" stackId="a" fill="#35D49B" />
                    </BarChart>
                </ResponsiveContainer> 
                </Col>
                <Col span={12}>
                <ResponsiveContainer width="100%" height="100%">
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
                    </PieChart>
                </ResponsiveContainer>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    asdlkaçsflkasçfsk
                </Col>
                <Col span={12}>
                    erqetreytruiroirory
                </Col>
            </Row>
        </Card>
    );
};

export default MainPainel;