import React, { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarker } from "@fortawesome/free-solid-svg-icons";
import { renderToString } from "react-dom/server"; // Import ReactDOMServer

function MouseoverMap({ locations, handleMarkerClick, openCharts }) {
  const mapHeight = openCharts ? "500px" : "720px";
  const mapWidth = openCharts ? "100%" : "95%";
  const zoomLevel = openCharts ? 1 : 2;

  useEffect(() => {
    const mapOptions = {
      minZoom: zoomLevel,
      maxZoom: 20,
    };

   
      // Apply maxBounds only when openCharts is false
      mapOptions.maxBounds = [[-90, -180], [90, 180]];


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

    // Create a custom FontAwesome icon for the markers
    const markerIcon = L.divIcon({
      className: "custom-marker-icon", // Custom CSS class to style the marker icon
      html: renderToString(
        // Use ReactDOMServer.renderToString to convert the FontAwesome icon to HTML
        <div style={{ fontSize: "24px", color: "red" }}>
          <FontAwesomeIcon icon={faMapMarker} />
        </div>
      ),
      iconSize: [30, 30],
      popupAnchor: [-5, -2], // Icon size (width, height) in pixels
    });

    // Add markers and popups for each location
    locations.forEach((location) => {
      const marker = L.marker([location.latitude, location.longitude], {
        icon: markerIcon, // Use the custom FontAwesome icon as the marker icon
      }).addTo(mymap);

      // Custom popup content to show the location on hover
      const popupContent = `<b>${location.location}</b>`;
      marker.bindPopup(popupContent);

      marker.on("click", () => {
        handleMarkerClick(location); // Pass the selected marker data to the parent component
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
  return <div id="map" style={{ height: mapHeight, width: mapWidth ,zIndex:"1"}} />;
}

export default MouseoverMap;
