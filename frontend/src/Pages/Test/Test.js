import { Collapse } from 'antd';
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, BarChart, LabelList, Label, Bar } from 'recharts';
import { DivCol } from '../../Services/Forms/Forms';
import LayoutAnt from '../Layout/LayoutAnt';

function Test() {
    const { Panel } = Collapse;
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    let margin = { top: 15, right: 30, left: 20, bottom: 5 }

    return (
        <LayoutAnt>
            <DivCol style={{ marginTop: "-25px", background: "white" }}>
                <Collapse defaultActiveKey={['1','2','3']} bordered={false} style={{background:"rgb(213 230 243)"}}>
                    <Panel header="This is panel header 1" key="1" size="small">
                        <LineChart
                            width={1000}
                            height={300}
                            data={data}
                            margin={margin}
                        >
                            {/* <CartesianGrid strokeDasharray="3 1" /> */}
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                width={20}
                                dataKey="pv"

                                stroke="#8884d8"
                            />
                            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                        </LineChart>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                        <AreaChart width={1000} height={300} data={data} margin={margin}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1" >
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="4" horizontalPoints={[1]} strokeDashArray="4 1" />
                            <Tooltip />
                            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" label />
                            <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
                            <LabelList dataKey="name" position="top" />

                        </AreaChart>
                    </Panel>
                    <Panel header="This is panel header 3" key="3">
                        <BarChart
                            width={1000}
                            height={300}
                            data={data}
                            margin={margin}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name">
                                <Label value="Pages of my website" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis label={{ value: 'pv of page', angle: -90, position: 'insideLeft' }} />
                            <Bar dataKey="pv" fill="#8884d8"
                                onClick={() => alert("okeee")}
                            >
                                <LabelList dataKey="name" position="top" />
                            </Bar>
                        </BarChart>
                    </Panel>
                </Collapse>,





                <br />
                <br />
                <br />
            </DivCol>
        </LayoutAnt>
    )
}

export default Test
