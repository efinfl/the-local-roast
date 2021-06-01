//https://www.npmjs.com/package/react-map-gl
import React from "react";
import {useState, useEffect} from "react"
import ReactMapGL from 'react-map-gl';

const MapBox = (props) => {
    const [viewport, setViewport] = useState({ latitude: 37.7577,longitude: -122.4376, zoom: 8});

    const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

    
    // useEffect(()=>{
    //     let newViewport = {...viewport};
    //     newViewport.latitude = props.location.lat;
    //     newViewport.longitude = props.location.lng;
    //     setViewport(newViewport)
    // },[])
    
    
    return (
        <>
            <ReactMapGL
                {...viewport}
                mapboxApiAccessToken={MAPBOX_TOKEN}
                width="50%"
                height="50%"
                onViewportChange={setViewport}
            /> 
           Map
        </>
    )
}

export default MapBox