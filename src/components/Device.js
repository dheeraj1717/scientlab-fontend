import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MDBDataTable, MDBTableHead  } from 'mdbreact';
import {CSVLink} from 'react-csv'
import { getMetrics, getStats, clearMetrics } from '../redux/actions/deviceActions';


const Device = () => {
    const dispatch = useDispatch();
    const [device, setDevice] = useState(null);
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const devices = useSelector(state => state.devices.devices);
    const user = useSelector((state) => state.auth.user);
    const metrics = useSelector(state => state.devices.metrics);


    useEffect(() => {
        dispatch(clearMetrics())
    }, [])

    const viewMetrics = () => {
        if (device) {
            dispatch(getMetrics({ "device": device.name, "location": device.location, "startDate": fromDate, "endDate": toDate }, user.accessToken, 'device'))
        }
    }
    const selectDevice = (event) => {
        const device = JSON.parse(event.target.value);
        dispatch(getStats(device.name, device.location, user.accessToken))
        setDevice(device);
    }

const DeviceMetricTable = () => {
    const updatedMetrics = (metrics.map((eachMetric) => (
        {
            timestamp: eachMetric.timestamp,
            memoryUsage: eachMetric.memoryUsage,
            cpuUsage: eachMetric.cpuUsage,
            temperatureC: eachMetric.temperatureC
        }
    ))) 

    const  DeviceHeaders = [
      { label: "Time stap", key: "timestamp" },
      { label: "Memory Usage", key: "memoryUsage" },
      { label: "CPU Usage", key: "cpuUsage" },
      { label: "Temperature", key: "temperatureC" }
    ];

  const data = {
    columns: [
      {
        label: 'Time Stamp',
        field: 'timestamp',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Memory Usage',
        field: 'memoryUsage',
        sort: 'asc',
        width: 270
      },
      {
        label: 'CPU usage',
        field: 'cpuUsage',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Temperature',
        field: 'temperatureC',
        sort: 'asc',
        width: 100
      },
    ],
    rows: updatedMetrics
   
  };

  
  return (
    <>
    <hr />
    <div className="d-flex justify-content-end">
    <Button> <CSVLink data= {updatedMetrics} header={DeviceHeaders} filename="DevicesMetrics.csv" style={{color:'#ffffff', textDecoration: "none"}}>Export</CSVLink></Button>
    </div>
    <MDBDataTable
      scrollY
      maxHeight="300px"
      bordered
      small
      data={data}
    />
   
    </>
  );
}










    return (
        <>
        <div>
        Device Location:
        <select onChange={selectDevice}>
            <option default>Select Device Location</option>
            {devices.map(device =>
                <option value={JSON.stringify(device)}>{device.location}</option>
            )}
        </select>
        &nbsp;&nbsp;
        From:
        <DateTimePicker
            value={fromDate}
            onChange={date => setFromDate(date)}
        />
        &nbsp;&nbsp;
        To:
        <DateTimePicker
            value={toDate}
            onChange={date => setToDate(date)}
        />&nbsp;&nbsp;
        <Button onClick={viewMetrics}>Go</Button>
        &nbsp;&nbsp;
        {metrics.length >= 0 ? <LineChart width={800} height={300} data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="memoryUsage" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" />
            <Line type="monotone" dataKey="temperatureC" stroke="#a14396" />

        </LineChart> : ""}
    </div>
    
    {metrics.length>=0 && DeviceMetricTable()}
  </>
);
}

export default Device;