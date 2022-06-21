import * as React from 'react';
import {useState, useEffect, useMemo} from 'react';
import {render} from 'react-dom';
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
import ControlPanel from './control-panel';
import Pin from './pin';

const TOKEN = 'pk.eyJ1IjoicnVzc2NhbGwiLCJhIjoiY2w0OHVpN2Z0MHczczNlbnNodHdxbGZ3NCJ9.FPCMQsW7K_C89mfzaxJH3Q'; // Set your mapbox token here

export const MapDisplay = () => {
    const [markerLoc, setMarkers] = useState([])
    const [popupInfo, setPopupInfo] = useState(null);
    const history = useHistory();


    useEffect(
        () => {
        getMarkers().then(data => setMarkers(data))
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
            mapStyle="mapbox://styles/mapbox/streets-v11"
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
                {popupInfo.marker_name}|{' '}

                    <button
                        key={`marker-${popupInfo.id}`}
                        onClick={() => 
                      history.push(`/markers/${popupInfo.id}`)}
                    >
                      Marker Details
                  </button>
            </div>
            <img width="100%" src={popupInfo.image} />
          </Popup>
        )}
      </Map>

      <ControlPanel />
    </div>
  );
}