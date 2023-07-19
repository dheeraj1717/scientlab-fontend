import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { MDBDataTable } from 'mdbreact';
import {CSVLink} from 'react-csv'
import { getMetrics, getStats, clearMetrics } from '../redux/actions/deviceActions';

const Environment = () => {
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
            dispatch(getMetrics({ "device": device.name, "location": device.location, "startDate": fromDate, "endDate": toDate }, user.accessToken, 'environment'))
        }
    }

    const selectDevice = (event) => {
        const device = JSON.parse(event.target.value);
        dispatch(getStats(device.name, device.location, user.accessToken))
        setDevice(device);
    }


    const EnvironmentTable = () => {
        const updatedMetrics = (metrics.map((eachMetric) => (
            {
                timestamp: eachMetric.timestamp,
                humidity: eachMetric.humidity,                    
                temperatureC: eachMetric.temperatureC,
                temperatureF: eachMetric.temperatureF
            }
        ))) 
    
      const data = {
        columns: [
          {
            label: 'Time Stamp',
            field: 'timestamp',
            sort: 'asc',
            width: 150
          },
          {
            label: 'Humidity',
            field: 'humidity',
            sort: 'asc',
            width: 270
          },
          {
            label: 'Temperature(F)',
            field: 'temperatureF',
            sort: 'asc',
            width: 200
          },
          {
            label: 'Temperature (C)',
            field: 'temperatureC',
            sort: 'asc',
            width: 100
          },
        ],
        rows: updatedMetrics
       
      };

      const  DeviceHeaders = [
        { label: "Time stap", key: "timestamp" },
        { label: "Huumidity", key: "humidity" },
        { label: "Temperature(F)", key: "temperatureF" },
        { label: "Temperature(C)", key: "temperatureC" }
      
      ];
    
      
      return (
        <>
        <hr />
        <div className="d-flex justify-content-end">
        <Button> <CSVLink data= {updatedMetrics} header={DeviceHeaders} filename="EnvironmentMetrices.csv" style={{color:'#ffffff', textDecoration: "none"}}>Export</CSVLink></Button>
        </div>
        <MDBDataTable
          striped
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
        {metrics.length > 0 ? <LineChart width={800} height={300} data={metrics}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperatureF" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="temperatureC" stroke="#82ca9d" />
            <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </LineChart> : ""}
    </div>
    {metrics.length>=0 && EnvironmentTable()}


    </>);
}

export default Environment;