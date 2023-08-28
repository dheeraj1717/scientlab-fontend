import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import DateTimePicker from "react-datetime-picker";
import { ResponsiveLine } from "@nivo/line";
import {
  getMetrics,
  getStats,
  clearMetrics,
} from "../redux/actions/deviceActions";
import DataTable from "react-data-table-component";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CSVLink } from "react-csv";

const Device = () => {
  const dispatch = useDispatch();
  const [device, setDevice] = useState(null);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const devices = useSelector((state) => state.devices.devices);
  const user = useSelector((state) => state.auth.user);
  const metrics = useSelector((state) => state.devices.metrics);

  useEffect(() => {
    dispatch(clearMetrics());
  }, []);

  const viewMetrics = () => {
    if (device) {
      dispatch(
        getMetrics(
          {
            device: device.name,
            location: device.location,
            startDate: fromDate,
            endDate: toDate,
          },
          user.accessToken,
          "device"
        )
      );
    }
  };

  const selectDevice = (event) => {
    const device = JSON.parse(event.target.value);
    dispatch(getStats(device.name, device.location, user.accessToken));
    setDevice(device);
  };

  const customStyles = {
    title: {
      style: {
        fontWeight: "bold",
      },
    },
    headCells: {
      style: {
        fontSize: "15px",
        fontWeight: "bold",
        backgroundColor: "#3982d7",
        color: "white",
      },
    },
    cells: {
      style: {
        fontSize: "14px",
        fontWeight: "500",
      },
    },
  };
  const empty = [
    {
      timestamp: "0",
      memoryUsage: "0",
      cpuUsage: "0",
      temperatureC: "0",
    },
  ];
  const columns = [
    { name: "Timestamp", selector: "timestamp", sortable: true },
    { name: "Memory Usage", selector: "memoryUsage", sortable: true },
    { name: "CPU Usage", selector: "cpuUsage", sortable: true },
    { name: "Temperature (C)", selector: "temperatureC", sortable: true },
  ];

  return (
    <div>
      <div className="flex flex-auto lg:flex-row flex-col">
        <div className="md:mb-0 mb-2 md:mt-2">
          {" "}
          <span className="md:text-lg text-md font-medium mr-1">
            Device Location :
          </span>
          <select onChange={selectDevice} className="mr-5">
            <option className="" defaultValue>
              Select Device Location
            </option>
            {devices?.map((device) => (
              <option key={device.name} value={JSON.stringify(device)}>
                {device.location}
              </option>
            ))}
          </select>
        </div>
        <div>
          {" "}
          <span className="font-semibold md:text-lg text-md  mr-2">From :</span>
          <DateTimePicker
            value={fromDate}
            onChange={(date) => setFromDate(date)}
            className="mr-5"
          />
          <span className="font-semibold md:text-lg text-md  mr-2">To :</span>
          <DateTimePicker value={toDate} onChange={(date) => setToDate(date)} />
          &nbsp;&nbsp;
          <Button onClick={viewMetrics}>Go</Button>
        </div>
      </div>
      &nbsp;&nbsp;
      {metrics.length >= 0 ? (
        <LineChart responsive width={800} height={300} data={metrics}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="timestamp" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="memoryUsage"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="cpuUsage" stroke="#82ca9d" />
          <Line type="monotone" dataKey="temperatureC" stroke="#a14396" />
        </LineChart>
      ) : (
        ""
      )}
      <hr />
      <div className="d-flex justify-content-end">
        {metrics.length > 0 && (
          <Button>
            {" "}
            <CSVLink
              data={metrics}
              header={columns}
              filename="DevicesMetrics.csv"
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              Export
            </CSVLink>
          </Button>
        )}
        {metrics.length === 0 && <Button>Export</Button>}
      </div>
      {metrics.length > 0 ? (
        <DataTable
          title="Device Metrics"
          columns={columns}
          data={metrics}
          customStyles={customStyles}
          pagination
          striped
        />
      ) : (
        <DataTable
          title="Device Metrics"
          columns={columns}
          data={empty}
          customStyles={customStyles}
          pagination
          striped
        />
      )}
    </div>
  );
};

export default Device;
