import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#000000', color: 'white', padding: '23px 13px', fontSize: '12px', borderRadius: '6px', fontFamily: 'Inter', fontWeight: 500, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {payload[0].payload.dateRange && (
                    <p className="week" style={{ margin: 0, color: 'white', fontWeight: 400 }}>{payload[0].payload.dateRange}</p>
                )}
                <p className="label" style={{ margin: 0, color: 'white', fontSize: '16px' }}>{`${payload[0].value} km`}</p>

            </div>
        );
    }
    return null;
};

const renderLegend = (props) => {
    return (
        <ul style={{ listStyleType: 'none', paddingLeft: 30, margin: 0, display: 'flex' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#0B23F4', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ color: '#74798C', fontSize: '14px', fontWeight: '500' }}>km</span>
            </li>
        </ul>
    );
};

const MonthsDistanceChart = ({ data }) => {
    return (
        <ResponsiveContainer width="100%" height={450}>
            <BarChart
                data={data}
                margin={{
                    top: 20,
                    right: 0,
                    left: -20,
                    bottom: 0,
                }}
                barGap={8}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9B9EAC', fontSize: 14 }} dy={15} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9B9EAC', fontSize: 14 }} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'none' }} />
                <Legend content={renderLegend} verticalAlign="bottom" align="left" wrapperStyle={{ paddingBottom: '20px', paddingTop: '20px' }} />
                <Bar dataKey="km" barSize={16} fill="#B6BDFC" radius={[30, 30, 30, 30]} activeBar={{ fill: '#0B23F4', radius: [30, 30, 30, 30] }} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MonthsDistanceChart;
