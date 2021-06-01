//https://www.npmjs.com/package/react-map-gl
import * as React from 'react';
import {useState} from 'react';
import {render} from 'react-dom';
import ReactMapGL, {Marker} from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

function MapBox(props) {
  const [viewport, setViewport] = useState({
    latitude: props.location.lat,
    longitude: props.location.lng,
    zoom: 14,
    bearing: 0,
    pitch: 0
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="250px"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={setViewport}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
        <Marker 
            latitude = {props.location.lat} 
            longitude = {props.location.lng} 
            offsetLeft={-20} offsetTop={-10}>
            <FontAwesomeIcon icon="coffee" />
        </Marker>
        
    </ReactMapGL>
  );
}

export default MapBox