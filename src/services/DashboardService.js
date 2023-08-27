import devices from "../data/devices.json";
import stats from "../data/device_stats.json";
import metrics from "../data/device_metrics.json";
import { BASE_URL } from "../util/Constants";

export const getAllDevices = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${BASE_URL}/devices`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        resolve(responseData);
      } else {
        // Handle non-OK response
        console.error("Error:", response.status);
        reject(response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
      resolve(devices);
    }
  });
};

export const getDeviceStats = async (device, location, token) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `${BASE_URL}/stats?device=${device}&location=${location}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        resolve(responseData);
      } else {
        // Handle non-OK response
        console.error("Error:", response.status);
        reject(response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
      resolve(stats);
    }
  });
};

export const getChartMetrics = async (request, token, type) => {
  return new Promise(async (resolve, reject) => {
    try {
      const url = type === "device" ? "metrics" : "envmetrics";
      const response = await fetch(`${BASE_URL}/${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      });

      if (response.ok) {
        const responseData = await response.json();
        resolve(responseData);
      } else {
        // Handle non-OK response
        console.error("Error:", response.status);
        reject(response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
      resolve(metrics);
    }
  });
};
