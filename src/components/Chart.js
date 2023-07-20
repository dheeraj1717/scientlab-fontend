import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const MetricChart = (metrics, type) => {
  return (
    <LineChart width={800} height={300} data={metrics}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" />
      <YAxis />
      <Tooltip />
      <Legend />
      {type === 'device' ? <div>
        <Line type="monotone" dataKey="memoryUsage" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" />
        <Line type="monotone" dataKey="temperatureC" stroke="#82ca9d" />
      </div> : <div>
        <Line type="monotone" dataKey="temperatureF" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="temperatureC" stroke="#82ca9d" />
        <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
      </div>}

    </LineChart>
  );
};

export default MetricChart;
