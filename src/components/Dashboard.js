import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Map from './Map';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-circular-progressbar/dist/styles.css';

import { clearStats, clearMetrics, getDevices, getStats } from '../redux/actions/deviceActions';

function Dashboard() {
  const dispatch = useDispatch();
  const [openCharts, setOpenCharts] = useState(false);
  const [device, setDevice] = useState(null);
  const devices = useSelector(state => state.devices.devices);
  const stats = useSelector(state => state.devices.stats);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getDevices(user.accessToken))
  }, [])


  const handleMarkerClick = (point) => {
    console.log(`selected location: ${point.location}`);
    dispatch(clearMetrics())
    dispatch(getStats(point.name, point.location, user.accessToken))
    setDevice(point);
    setOpenCharts(true);
  };

  const removeCharts = () => {
    dispatch(clearStats())
    dispatch(clearMetrics())
    setDevice({})
    setOpenCharts(false)
  };

  return (
    <div>
      {openCharts ? <div>
        <Button variant="outline-danger" className="close-button" onClick={removeCharts}>
          X
        </Button>
        <p style={{
          margin: "auto",
          width: "50%",
          padding: "10px",
          display: "inline-block",
          color: "#0a58ca"
        }}>Device: <b>{device.name}</b>     |     Location: <b>{device.location}</b>      |     Region: <b>{device.region}</b></p>
        <hr />
        <Container>
          <Row>
            <Col>
              <Row>
                <h6 style={{ textAlign: "center", color: "#0a58ca" }}>Device Metrics</h6>
                <Col>
                  <div style={{ width: '100px', height: '100px' }}>
                    Temperature_C
                    <CircularProgressbar
                      value={stats.temperatureC}
                      text={stats && stats.temperatureC ? `${stats.temperatureC}%` : ''}
                      strokeWidth={12}
                      styles={buildStyles({
                        rotation: 0.7,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `#3B98D6`,
                        textColor: '#333333',
                        trailColor: '#f8f8f8',
                        backgroundColor: '#e4e4e4',
                      })}
                    />
                  </div>
                </Col>
                <Col>
                  <div style={{ width: '110px', height: '100px' }}>
                    CPU Usage
                    <CircularProgressbar
                      value={stats.cpuUsage}
                      text={stats && stats.cpuUsage ? `${stats.cpuUsage}%` : ''}
                      strokeWidth={12}
                      styles={buildStyles({
                        rotation: 0.7,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `#3B98D6`,
                        textColor: '#333333',
                        trailColor: '#f8f8f8',
                        backgroundColor: '#e4e4e4',
                      })}
                    />
                  </div>
                </Col>
                <Col>
                  <div style={{ width: '110px', height: '100px' }}>
                    Memory Usage
                    <CircularProgressbar
                      value={stats.memoryUsage}
                      text={stats && stats.memoryUsage ? `${stats.memoryUsage}%` : ''}
                      strokeWidth={12}
                      styles={buildStyles({
                        rotation: 0.7,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `#3B98D6`,
                        textColor: '#333333',
                        trailColor: '#f8f8f8',
                        backgroundColor: '#e4e4e4',
                      })}
                    />
                  </div>
                </Col></Row>
              <div style={{ paddingTop: "40px" }}></div>
              <hr />
              <Row>
                <h6 style={{ textAlign: "center", color: "#0a58ca" }}>Environment Metrics</h6>
                <Col>
                  <div style={{ width: '110px', height: '100px' }}>
                    Humidity
                    <CircularProgressbar
                      value={stats.roomHumidity}
                      text={stats && stats.roomHumidity ? `${stats.roomHumidity}%` : ''}
                      strokeWidth={12}
                      styles={buildStyles({
                        rotation: 0.7,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `#3B98D6`,
                        textColor: '#333333',
                        trailColor: '#f8f8f8',
                        backgroundColor: '#e4e4e4',
                      })}
                    />
                  </div>
                </Col>                <Col>
                  <div style={{ width: '110px', height: '100px' }}>
                    Temperature_C
                    <CircularProgressbar
                      value={stats.roomTemperatureC}
                      text={stats && stats.roomTemperatureC ? `${stats.roomTemperatureC}%` : ''}
                      strokeWidth={12}
                      styles={buildStyles({
                        rotation: 0.7,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `#3B98D6`,
                        textColor: '#333333',
                        trailColor: '#f8f8f8',
                        backgroundColor: '#e4e4e4',
                      })}
                    />
                  </div>
                </Col>                <Col>
                  <div style={{ width: '110px', height: '100px' }}>
                    Temperature_F
                    <CircularProgressbar
                      value={stats.roomTemperatureF}
                      text={stats && stats.roomTemperatureF ? `${stats.roomTemperatureF}%` : ''}
                      strokeWidth={12}
                      styles={buildStyles({
                        rotation: 0.7,
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 0.5,
                        pathColor: `#3B98D6`,
                        textColor: '#333333',
                        trailColor: '#f8f8f8',
                        backgroundColor: '#e4e4e4',
                      })}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col><Map dataPoints={devices} handleMarkerClick={handleMarkerClick} st={{
              height: '300px',
              width: '100%',
              zoom: 1.5,
              center: [40, 60],
              dataPoint: device
            }} /></Col>
          </Row>
        </Container>
      </div> : <div><span>Click on the <b>DataPoints</b> to view the Device Metrics</span>
        <Map dataPoints={devices} handleMarkerClick={handleMarkerClick} st={{
          height: '300px',
          width: '100%',
          zoom: 2,
          center: [30, 70],
          dataPoint: device
        }} /></div>}

    </div>
  );
}

export default Dashboard;
