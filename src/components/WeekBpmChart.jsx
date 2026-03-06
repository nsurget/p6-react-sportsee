import React from 'react';
import {
    ComposedChart,
    Line,
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
        const data = payload[0].payload;
        if (data.min === null && data.max === null && data.moy === null) {
            return null; // Don't show tooltip if no data
        }
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#000000', color: 'white', padding: '15px', borderRadius: '6px', fontFamily: 'Inter', fontWeight: 500, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <p style={{ margin: 0, color: 'white', fontSize: '16px' }}>{data.formattedDate}</p>
                <p style={{ margin: 0, color: 'white', fontSize: '16px' }}>Min: {data.min || '--'} BPM</p>
                <p style={{ margin: 0, color: 'white', fontSize: '16px' }}>Moy: {data.moy || '--'} BPM</p>
                <p style={{ margin: 0, color: 'white', fontSize: '16px' }}>Max: {data.max || '--'} BPM</p>
            </div>
        );
    }
    return null;
};

const renderLegend = (props) => {
    return (
        <ul style={{ listStyleType: 'none', paddingLeft: 30, margin: 0, display: 'flex', gap: '20px' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#FCC1B6', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ color: '#74798C', fontSize: '14px', fontWeight: '500' }}>min</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#0B23F4', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ color: '#74798C', fontSize: '14px', fontWeight: '500' }}>moy</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#F4320B', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ color: '#74798C', fontSize: '14px', fontWeight: '500' }}>max</span>
            </li>
        </ul>
    );
};

const WeekBpmChart = ({ data }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <ResponsiveContainer width="100%" height={450}>
            <ComposedChart
                data={data}
                margin={{
                    top: 20,
                    right: 0,
                    left: -20,
                    bottom: 0,
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EBEBEB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9B9EAC', fontSize: 14 }} dy={15} />
                <YAxis domain={['dataMin - 20', 'auto']} axisLine={false} tickLine={false} tick={{ fill: '#9B9EAC', fontSize: 14 }} dx={-10} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'none' }} />
                <Legend content={renderLegend} verticalAlign="bottom" align="left" wrapperStyle={{ paddingBottom: '20px', paddingTop: '20px' }} />
                <Bar dataKey="min" barSize={20} fill="#FCC1B6" radius={[30, 30, 30, 30]} />
                <Bar dataKey="max" barSize={20} fill="#F4320B" radius={[30, 30, 30, 30]} />
                <Line type="monotone" dataKey="moy" connectNulls={false} stroke={isHovered ? "#0B23F4" : "#F2F3FF"} strokeWidth={3} dot={{ r: 4, fill: '#0B23F4', stroke: '#0B23F4', strokeWidth: 2 }} activeDot={{ r: 6 }} style={{ transition: 'stroke 0.3s ease' }} />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default WeekBpmChart;
