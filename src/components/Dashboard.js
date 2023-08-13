import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MouseoverMap from "./Map";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-circular-progressbar/dist/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faSearchPlus } from "@fortawesome/free-solid-svg-icons";
import {
  clearStats,
  clearMetrics,
  getDevices,
  getStats,
} from "../redux/actions/deviceActions";

function Dashboard() {
  const dispatch = useDispatch();
  const [openCharts, setOpenCharts] = useState(false);
  const [device, setDevice] = useState(null);
  const devices = useSelector((state) => state.devices.devices);
  const stats = useSelector((state) => state.devices.stats);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getDevices(user.accessToken));
  }, []);

  const handleMarkerClick = (point) => {
    console.log(`selected location: ${point.location}`);
    dispatch(clearMetrics());
    dispatch(getStats(point.name, point.location, user.accessToken));
    setDevice(point);
    setOpenCharts(true);
  };

  const removeCharts = () => {
    dispatch(clearStats());
    dispatch(clearMetrics());
    setDevice({});
    setOpenCharts(false);
  };

  return (
    <div className="position-relative">
      {openCharts ? (
        <div>
          <Button
            variant="outline-danger"
            className="close-button "
            onClick={removeCharts}
          >
            <FontAwesomeIcon icon={faX} />
          </Button>
          <p
            className="mx-auto w-1/2 p-2 text-center text-blue-600"
          >
            Device: <b>{device.name}</b> | Location: <b>{device.location}</b> |
            Region: <b>{device.region}</b>
          </p>
          <div className="grid md:grid-cols-2 gap-6 md:space-y-0 space-y-10">
            <div className="col-span-2 md:col-span-1">
              <h6 className="text-center text-blue-600">Device Metrics</h6>
              <div className="flex justify-around">
                <div className="space-y-2 flex flex-col text-center">
                Temperature_C
                <div className="w-20 h-20 mx-auto mt-2">
                 
                  <CircularProgressbar
                    value={stats.temperatureC}
                    text={stats ? `${stats.temperatureC}%` : "0%"}
                    strokeWidth={12}
                    styles={buildStyles({
                      rotation: 0.7,
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor:
                        parseInt(stats.temperatureC) < 60
                          ? `#3B98D6`
                          : `red`,
                      textColor: "#333333",
                      trailColor: "#f8f8f8",
                      backgroundColor: "#e4e4e4",
                    })}
                  />
                </div>
                </div>
                <div className="text-center">
                CPU Usage
                <div className="w-20 h-20 mx-auto mt-2">
                 
                  <CircularProgressbar
                    value={stats.cpuUsage}
                    text={stats ? `${stats.cpuUsage}%` : "0%"}
                    strokeWidth={12}
                    styles={buildStyles({
                      rotation: 0.7,
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor:
                        parseInt(stats.cpuUsage) < 60 ? `#3B98D6` : `red`,
                      textColor: "#333333",
                      trailColor: "#f8f8f8",
                      backgroundColor: "#e4e4e4",
                    })}
                  />
                </div>
                </div>
                <div>
                Memory Usage
                <div className="w-20 h-20 mx-auto mt-2">
                
                  <CircularProgressbar
                    value={stats.memoryUsage}
                    text={stats ? `${stats.memoryUsage}%` : "0%"}
                    strokeWidth={12}
                    styles={buildStyles({
                      rotation: 0.7,
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor:
                        parseInt(stats.memoryUsage) < 60
                          ? `#3B98D6`
                          : `red`,
                      textColor: "#333333",
                      trailColor: "#f8f8f8",
                      backgroundColor: "#e4e4e4",
                    })}
                  />
                </div>
                </div>
                
              </div>
              <hr />
              <h6 className="text-center text-blue-600">Environment Metrics</h6>
              <div className="flex justify-around">
                <div className="space-y-2 flex flex-col text-center">
                Humidity
                <div className="w-20 h-20 mx-auto mt-2">
                  
                  <CircularProgressbar
                    value={stats.roomHumidity}
                    text={stats ? `${stats.roomHumidity}%` : "0%"}
                    strokeWidth={12}
                    styles={buildStyles({
                      rotation: 0.7,
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor:
                        parseInt(stats.roomHumidity) < 60
                          ? `#3B98D6`
                          : `red`,
                      textColor: "#333333",
                      trailColor: "#f8f8f8",
                      backgroundColor: "#e4e4e4",
                    })}
                  />
                </div>
                </div>
                <div className="text-center">
                Temperature_C
                <div className="w-20 h-20 mx-auto mt-2">
                 
                  <CircularProgressbar
                    value={stats.roomTemperatureC}
                    text={stats ? `${stats.roomTemperatureC}%` : "0%"}
                    strokeWidth={12}
                    styles={buildStyles({
                      rotation: 0.7,
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor:
                        parseInt(stats.roomTemperatureC) < 60
                          ? `#3B98D6`
                          : `red`,
                      textColor: "#333333",
                      trailColor: "#f8f8f8",
                      backgroundColor: "#e4e4e4",
                    })}
                  />
                </div>
                </div>
                <div className="text-center">
                Temperature_F
                <div className="w-20 h-20 mx-auto mt-2">
                  
                  <CircularProgressbar
                    value={stats.roomTemperatureF}
                    text={stats ? `${stats.roomTemperatureF}%` : "0%"}
                    strokeWidth={12}
                    styles={buildStyles({
                      rotation: 0.7,
                      strokeLinecap: "butt",
                      pathTransitionDuration: 0.5,
                      pathColor:
                        parseInt(stats.roomTemperatureF) < 60
                          ? `#3B98D6`
                          : `red`,
                      textColor: "#333333",
                      trailColor: "#f8f8f8",
                      backgroundColor: "#e4e4e4",
                    })}
                  />
                </div>
                </div>
               
              </div>
            </div>
            <div className="col-span-2 md:col-span-1 p-2">
              <MouseoverMap
                locations={devices}
                handleMarkerClick={handleMarkerClick}
                openCharts={openCharts}
                className="absolute"
              />
              <div className="text-center mt-4 mb-2">
                Hover on Map and scroll to zoom{" "}
                <FontAwesomeIcon icon={faSearchPlus} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <span>
            Click on the <b>DataPoints</b> to view the Device Metrics
          </span>
          <div className="text-center mb-2">
            Hover on Map and scroll to zoom{" "}
            <FontAwesomeIcon icon={faSearchPlus} />
          </div>
          <MouseoverMap
            locations={devices}
            handleMarkerClick={handleMarkerClick}
            openCharts={openCharts}
          />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
