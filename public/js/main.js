function initMap(map) {
    map.setZoom(1.5);
}
  
var platform = new H.service.Platform({
  apikey: JSON.parse(document.querySelector('#api-key').value).apiKey //pulling it from env
});
var defaultLayers = platform.createDefaultLayers();
  
var map = new H.Map(document.getElementById('map'),
  defaultLayers.vector.normal.map, {
    center: {
      lat: 50,
      lng: 5
    },
    zoom: 4,
    pixelRatio: window.devicePixelRatio || 1
  });
window.addEventListener('resize', () => map.getViewPort().resize());
  
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, defaultLayers);
  
window.onload = function() {
    initMap(map);
}
  