import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import Map, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl
} from 'react-map-gl';
import {useHistory} from 'react-router-dom';
import { getMarkers } from '../markers/MarkerManager';
import Pin from './pin';
import "mapbox-gl/dist/mapbox-gl.css";
import { _CameraLight as CameraLight, LightingEffect } from "@deck.gl/core";
import { withStyles } from "@material-ui/styles";
import MapControlsContainer from "./MapControlsContainer";
import { Button } from '@mui/material'

const TOKEN = 'pk.eyJ1IjoicnVzc2NhbGwiLCJhIjoiY2w0OHVpN2Z0MHczczNlbnNodHdxbGZ3NCJ9.FPCMQsW7K_C89mfzaxJH3Q'; // Set your mapbox token here

export const MapDisplay = () => {
    const [markerLoc, setMarkers] = useState([])  // markerLoc is the marker objects array
    const [popupInfo, setPopupInfo] = useState(null);  // popupInfo is the marker object with all the info
    const history = useHistory();


    useEffect( //
        () => {
        getMarkers().then(data => setMarkers(data)) // calls getMarkers sets markerLoc state to the API data.
    }, [])

    const pins = useMemo(
        () =>
            markerLoc.map((marker) => (
        <Marker
            key={`marker-${marker.id}`}
            longitude={marker.longitude}
            latitude={marker.latitude}
            anchor="bottom"
            onClick={event => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            event.originalEvent.stopPropagation();
            setPopupInfo(marker);
            }}
        >
            <Pin />
        </Marker>
        )),
    [markerLoc]
    );

    return (
    <div className="map-container">
        <Map
            initialViewState={{
                latitude: 36.1627,
                longitude: -86.7816,
                zoom: 11.5,
                bearing: 0,
                pitch: 0
            }}
            mapStyle='mapbox://styles/mapbox/light-v9'
            mapboxAccessToken={TOKEN}
        >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {pins}

        {popupInfo && (
            <Popup
                anchor="top"
                longitude={Number(popupInfo.longitude)}
                latitude={Number(popupInfo.latitude)}
                onClose={() => setPopupInfo(null)}
            >
            <div>
                {popupInfo.marker_name}:{' '}

                    <Button
                        variant="text"
                        key={`marker-${popupInfo.id}`}
                        onClick={() => 
                      history.push(`/markers/${popupInfo.id}`)}
                    >
                      Marker Details
                  </Button>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>

      <MapControlsContainer />
    </div>
  );
}