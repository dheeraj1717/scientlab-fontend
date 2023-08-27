import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';
import { ResponsiveLine } from '@nivo/line';
import { getMetrics, getStats, clearMetrics } from '../redux/actions/deviceActions';
import DataTable from 'react-data-table-component';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CSVLink } from 'react-csv'

const Device = () => {
  const dispatch = useDispatch();
  const [device, setDevice] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const devices = useSelector(state => state.devices.devices);
  const user = useSelector(state => state.auth.user);
  const metrics = useSelector(state => state.devices.metrics);

  useEffect(() => {
    dispatch(clearMetrics());
  }, []);

  const viewMetrics = () => {
    if (device) {
      dispatch(getMetrics({
        device: device.name,
        location: device.location,
        startDate: fromDate,
        endDate: toDate
      }, user.accessToken, 'device'));
    }
  }; 

  const selectDevice = (event) => {
    const device = JSON.parse(event.target.value);
    dispatch(getStats(device.name, device.location, user.accessToken));
    setDevice(device);
  };

  const customStyles = {
    title:{
      style:{
fontWeight:'bold'
      }
    },
    headCells: {
      style: {
        fontSize: '15px',
        fontWeight: 'bold',
        backgroundColor: '#3982d7',
        color: 'white'
      },
    },
    cells: {
      style: {
        fontSize: '14px',
        fontWeight: '500'
      },
    },
  };

  const columns = [
    { name: 'Timestamp', selector: 'timestamp', sortable: true },
    { name: 'Memory Usage', selector: 'memoryUsage', sortable: true },
    { name: 'CPU Usage', selector: 'cpuUsage', sortable: true },
    { name: 'Temperature (C)', selector: 'temperatureC', sortable: true },
  ];

  return (
    <div>
    <div className='flex flex-auto lg:flex-row flex-col'>

    <div className='md:mb-0 mb-2'>  <span className='md:text-lg text-md font-medium mr-1'>Device Location :</span>
      <select onChange={selectDevice} className='mr-5'>
        <option className='' defaultValue>Select Device Location</option >
        {devices?.map(device =>
          <option key={device.name} value={JSON.stringify(device)}>{device.location}</option>
        )}
      </select></div>
     <div> <span className='font-semibold md:text-lg text-md  mr-2'>From :</span>
      <DateTimePicker
        value={fromDate}
        onChange={date => setFromDate(date)}
        className="mr-5"
        
      />
     <span className='font-semibold md:text-lg text-md  mr-2'>To :</span>
      <DateTimePicker
        value={toDate}
        onChange={date => setToDate(date)}
      />&nbsp;&nbsp;
      <Button onClick={viewMetrics}>Go</Button>
      </div>
      </div>
      &nbsp;&nbsp;
      {metrics.length >= 0 ? <LineChart
  responsive
  width={800}
  height={300}
  data={metrics}
>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="memoryUsage" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" />
          <Line type="monotone" dataKey="temperatureC" stroke="#a14396" />
        </LineChart> : ""}
      <hr />
      <div className="d-flex justify-content-end">
          {metrics.length > 0 &&
            <Button> <CSVLink data={metrics} header={columns} filename="DevicesMetrics.csv" style={{ color: '#ffffff', textDecoration: "none" }}>Export</CSVLink></Button>
          }
          {metrics.length === 0 &&
            <Button>Export</Button>
          }
        </div>
      {metrics.length > 0 && (
        <DataTable
          title="Device Metrics"
          columns={columns}
          data={metrics}
          customStyles={customStyles}
          pagination
          striped
        />
      )}
    </div>
  );
}

export default Device;






// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'react-bootstrap';
// import DateTimePicker from 'react-datetime-picker';
// import { ResponsiveLine } from '@nivo/line';
// import { getMetrics, getStats, clearMetrics } from '../redux/actions/deviceActions';

// const Device = () => {
//   const dispatch = useDispatch();
//   const [device, setDevice] = useState(null);
//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());

//   const devices = useSelector(state => state.devices.devices);
//   const user = useSelector(state => state.auth.user);
//   const metrics = useSelector(state => state.devices.metrics);

//   useEffect(() => {
//     dispatch(clearMetrics());
//   }, []);

//   const viewMetrics = () => {
//     if (device) {
//       dispatch(getMetrics({
//         device: device.name,
//         location: device.location,
//         startDate: fromDate,
//         endDate: toDate
//       }, user.accessToken, 'device'));
//     }
//   }; 

//   const selectDevice = (event) => {
//     const device = JSON.parse(event.target.value);
//     dispatch(getStats(device.name, device.location, user.accessToken));
//     setDevice(device);
//   };
  
// console.log('devices from Redux store:', devices);
// console.log('matrix from Redux store:', metrics);

//   return (
//     <div>
//       Device Location:
//       <select onChange={selectDevice}>
//         <option defaultValue>Select Device Location</option>
//         {devices?.map(device =>
//           <option key={device.name} value={JSON.stringify(device)}>{device.location}</option>
//         )}
//       </select>
//       &nbsp;&nbsp;
//       From:
//       <DateTimePicker
//         value={fromDate}
//         onChange={date => setFromDate(date)}
//       />
//       &nbsp;&nbsp;
//       To:
//       <DateTimePicker
//         value={toDate}
//         onChange={date => setToDate(date)}
//       />&nbsp;&nbsp;
//       <Button onClick={viewMetrics}>Go</Button>
//       &nbsp;&nbsp;
//       {metrics.length > 0 ? (
//         <div style={{ height: '300px' }}>
//               <ResponsiveLine
//             data={metrics}
//             margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
//             xScale={{ type: 'point' }}
//             xFormat=" >-"
//             yScale={{
//               type: 'linear',
//               min: 'auto',
//               max: 'auto',
//               stacked: true,
//               reverse: false
//             }}
//             yFormat=" >-.2f"
//             axisTop={null}
//             axisRight={null}
//             axisBottom={{
//               tickSize: 5,
//               tickPadding: 5,
//               tickRotation: 0,
//               legend: 'Time',
//               legendOffset: 36,
//               legendPosition: 'middle'
//             }}
//             axisLeft={{
//               tickSize: 5,
//               tickPadding: 5,
//               tickRotation: 0,
//               legend: 'Values',
//               legendOffset: -40,
//               legendPosition: 'middle'
//             }}
//             pointSize={10}
//             pointColor={{ theme: 'background' }}
//             pointBorderWidth={2}
//             pointBorderColor={{ from: 'serieColor' }}
//             pointLabelYOffset={-12}
//             useMesh={true}
//             legends={[
//               {
//                 anchor: 'bottom-right',
//                 direction: 'column',
//                 justify: false,
//                 translateX: 100,
//                 translateY: 0,
//                 itemsSpacing: 0,
//                 itemDirection: 'left-to-right',
//                 itemWidth: 80,
//                 itemHeight: 20,
//                 itemOpacity: 0.75,
//                 symbolSize: 12,
//                 symbolShape: 'circle',
//                 symbolBorderColor: 'rgba(0, 0, 0, .5)',
//                 effects: [
//                   {
//                     on: 'hover',
//                     style: {
//                       itemBackground: 'rgba(0, 0, 0, .03)',
//                       itemOpacity: 1
//                     }
//                   }
//                 ]
//               }
//             ]}
//           />
//         </div>
//       ) : (
//         <p>No metrics data available</p>
//       )}
//     </div>
//   );
// }

// export default Device;





// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Button } from 'react-bootstrap';
// import DateTimePicker from 'react-datetime-picker';
// import { LineChart,Line } from '@nivo/line';
// import { MDBDataTable } from 'mdbreact';
// import { CSVLink } from 'react-csv';
// import { getMetrics, getStats, clearMetrics } from '../redux/actions/deviceActions';

// const Device = () => {
//   const dispatch = useDispatch();
//   const [device, setDevice] = useState(null);
//   const [fromDate, setFromDate] = useState(new Date());
//   const [toDate, setToDate] = useState(new Date());

//   const devices = useSelector(state => state.devices.devices);
//   const user = useSelector((state) => state.auth.user);
//   const metrics = useSelector(state => state.devices.metrics);

//   useEffect(() => {
//     dispatch(clearMetrics())
//   }, [])

//   const viewMetrics = () => {
//     if (device) {
//       dispatch(getMetrics({ "device": device.name, "location": device.location, "startDate": fromDate, "endDate": toDate }, user.accessToken, 'device'))
//     }
//   }
//   const selectDevice = (event) => {
//     const device = JSON.parse(event.target.value);
//     dispatch(getStats(device.name, device.location, user.accessToken))
//     setDevice(device);
//   }

//   const loadDeviceMetricTable = () => {
//     const deviceHeaders = [
//       { label: "Timestamp", key: "timestamp" },
//       { label: "Memory Usage", key: "memoryUsage" },
//       { label: "CPU Usage", key: "cpuUsage" },
//       { label: "Temperature (C)", key: "temperatureC" }
//     ];

//     const data = {
//       columns: [
//         {
//           label: 'Timestamp',
//           field: 'timestamp',
//           sort: 'asc',
//           width: 150
//         },
//         {
//           label: 'Memory Usage',
//           field: 'memoryUsage',
//           sort: 'asc',
//           width: 270
//         },
//         {
//           label: 'CPU usage',
//           field: 'cpuUsage',
//           sort: 'asc',
//           width: 200
//         },
//         {
//           label: 'Temperature (C)',
//           field: 'temperatureC',
//           sort: 'asc',
//           width: 100
//         },
//       ],
//       rows: metrics
//     };

//     return (
//       <>
//         <div className="d-flex justify-content-end">
//           {metrics.length > 0 &&
//             <Button> <CSVLink data={metrics} header={deviceHeaders} filename="DevicesMetrics.csv" style={{ color: '#ffffff', textDecoration: "none" }}>Export</CSVLink></Button>
//           }
//           {metrics.length === 0 &&
//             <Button>Export</Button>
//           }
//         </div>
//         <MDBDataTable
//           scrollY
//           maxHeight="300px"
//           bordered
//           small
//           data={data}
//         />
//       </>
//     );
//   }

//   return (
//     <>
//       <div>
//         Device Location:
//         <select onChange={selectDevice}>
//           <option default>Select Device Location</option>
//           {devices.map(device =>
//             <option value={JSON.stringify(device)}>{device.location}</option>
//           )}
//         </select>
//         &nbsp;&nbsp;
//         From:
//         <DateTimePicker
//           value={fromDate}
//           onChange={date => setFromDate(date)}
//         />
//         &nbsp;&nbsp;
//         To:
//         <DateTimePicker
//           value={toDate}
//           onChange={date => setToDate(date)}
//         />&nbsp;&nbsp;
//           <Button onClick={viewMetrics}>Go</Button>
//         &nbsp;&nbsp;
//         <LineChart
//           width={800}
//           height={300}
//           data={metrics}
//           margin={{ top: 30, right: 20, bottom: 70, left: 20 }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="timestamp" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Line type="monotone" dataKey="memoryUsage" stroke="#8884d8" activeDot={{ r: 8 }} />
//           <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" />
//           <Line type="monotone" dataKey="temperatureC" stroke="#a14396" />
//         </LineChart>
//       </div>
//       <hr />
//       {metrics.length >= 0 && loadDeviceMetricTable()}
//     </>
//   );
// }

// export default Device;
