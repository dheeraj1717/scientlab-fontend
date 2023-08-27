import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { renderToString } from "react-dom/server"; // Import ReactDOMServer

function MouseoverMap({ locations, handleMarkerClick, openCharts }) {
  const mapHeight = openCharts ? "500px" : "720px";
  const mapWidth = openCharts ? "100%" : "100%";
  const zoomLevel = openCharts ? 1 : 2;

  useEffect(() => {
    const mapOptions = {
      minZoom: zoomLevel,
      maxZoom: 20,
    };

    // Apply maxBounds only when openCharts is false
    mapOptions.maxBounds = [
      [-90, -180],
      [90, 180],
    ];

    const mymap = L.map("map", mapOptions).setView([0, 0], zoomLevel, {
      lang: "en",
    });
    const googleStreets = L.tileLayer(
      "http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}",
      {
        maxZoom: 20,
        subdomains: ["mt0", "mt1", "mt2", "mt3"],
      }
    ).addTo(mymap);

    // Add markers and popups for each location
    locations.forEach((location) => {
      const isActive = location.active; // Create a variable to hold the active status
      const markerIcon = L.divIcon({
        className: "custom-marker-icon",
        html: renderToString(
          <div
            style={{
              fontSize: "24px",
              color: isActive ? "red" : "gray",
            }}
          >
            <FontAwesomeIcon icon={faMapMarker} />
          </div>
        ),
        iconSize: [30, 30],
        popupAnchor: [-5, -2],
      });

      const marker = L.marker([location.latitude, location.longitude], {
        icon: markerIcon,
      }).addTo(mymap);

      // Custom popup content to show the location on hover
      const popupContent = `
      <b>${location.location}</b>
      <span style="display: inline-block; width: 10px; height: 10px; background-color: ${
        isActive ? "green" : "grey" // Use the isActive variable here
      }; border-radius: 50%; margin-left: 5px;"></span>
    `;

      marker.bindPopup(popupContent);

      marker.on("click", () => {
        handleMarkerClick(location);
      });

      marker.on("mouseover", () => {
        marker.openPopup();
      });

      marker.on("mouseout", () => {
        marker.closePopup();
      });
    });

    return () => {
      mymap.remove();
    };
  }, [locations, handleMarkerClick, openCharts]);

  // Return the map container div here
  return (
    <div id="map" style={{ height: mapHeight, width: mapWidth, zIndex: "1" }} />
  );
}

export default MouseoverMap;
