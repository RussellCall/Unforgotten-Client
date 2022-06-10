//Link:
<link href='https://api.mapbox.com/mapbox-gl-js/v2.8.1/mapbox-gl.css' rel='stylesheet' />



//Replace 'YOUR_CONTAINER_ELEMENT_ID' with the id of an element on your page where you would like your map.
var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoicnVzc2NhbGwiLCJhIjoiY2w0OHVpN2Z0MHczczNlbnNodHdxbGZ3NCJ9.FPCMQsW7K_C89mfzaxJH3Q';
var map = new mapboxgl.Map({
  container: 'YOUR_CONTAINER_ELEMENT_ID',
  style: 'mapbox://styles/mapbox/streets-v11'
});







