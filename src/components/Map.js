import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';

function Map({ dataPoints, handleMarkerClick, st }) {
    const [hoveredMarker, setHoveredMarker] = useState(null);
    const handleMarkerHover = (marker) => {
        setHoveredMarker(marker);
    };

    const handleMarkerLeave = () => {
        setHoveredMarker(null);
    };
    const geoUrl =
        "/features.json";
    return (
        <div>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{ scale: 100 }}
                style={{ height: st.height, width: st.width }}
            >
                <ZoomableGroup center={st.center} zoom={st.zoom}>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => (
                                <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
                            ))
                        }
                    </Geographies>
                    {dataPoints.map((dataPoint, index) => (
                        <Marker
                            key={index}
                            coordinates={[dataPoint.longitude, dataPoint.latitude]}
                            onClick={() => handleMarkerClick(dataPoint)}
                            onMouseEnter={() => handleMarkerHover(dataPoint)}
                            onMouseLeave={handleMarkerLeave}
                            data-tip={dataPoint.location}
                        >
                            {st.dataPoint === dataPoint || hoveredMarker === dataPoint ? <circle cx={0} cy={0} r={8} fill="pink" /> : ""}
                            <circle r={4} fill="#F53" />
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
            <div style={{ color: "red", textAlign: 'center', marginTop: '83px' }}>Hover on Map and scroll to zoom <FontAwesomeIcon icon={faSearchPlus} /></div>
        </div>

    );
}

export default Map;
