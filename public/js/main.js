function initMap(map) {
    map.setZoom(1.5);
}
  
var platform = new H.service.Platform({
  apikey: JSON.parse(document.querySelector('#api-key').value).apiKey //pulling it from env
});

var engineType = H.Map.EngineType['HARP'];
var style = new H.map.render.harp.Style('https://heremaps.github.io/maps-api-for-javascript-examples/change-harp-style-at-load/data/night.json');
var vectorLayer = platform.getOMVService().createLayer(style, { engineType });

var defaultLayers = platform.createDefaultLayers();
  
var map = new H.Map(document.getElementById('map'),
  vectorLayer, {
  engineType,
  center: {lat: 52.51477270923461, lng: 13.39846691425174},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});

window.addEventListener('resize', () => map.getViewPort().resize());
  
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
window.onload = function() {
    initMap(map);
}
  