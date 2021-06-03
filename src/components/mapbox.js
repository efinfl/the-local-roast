//https://www.npmjs.com/package/react-map-gl
import * as React from 'react';
import {useState} from 'react';
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
            latitude = {props.userLat} 
            longitude = {props.userLng} 
            offsetLeft={0} offsetTop={0}>
            <FontAwesomeIcon className = "text-bright-red" icon="star"/>
        </Marker>
        <Marker 
            latitude = {props.location.lat} 
            longitude = {props.location.lng} 
            offsetLeft={0} offsetTop={0}>
            <FontAwesomeIcon className = "text-bright-red" icon="map-marker-alt"/>
        </Marker>
        
    </ReactMapGL>
  );
}

export default MapBox