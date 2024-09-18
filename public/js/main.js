const mapStyle = "https://heremaps.github.io/maps-api-for-javascript-examples/change-harp-style-at-load/data/night.json";
const initMap = (map) => map.setZoom(1.5)

var platform = new H.service.Platform({
  apikey: JSON.parse(document.querySelector('#api-key').value).apiKey //pulling it from env
});

// create map
var engineType = H.Map.EngineType['HARP'];
var style = new H.map.render.harp.Style(mapStyle);
const defaultLayers = platform.createDefaultLayers({ engineType });
var vectorLayer = platform.getOMVService().createLayer(style, { engineType });
var map = new H.Map(document.getElementById('map'),
  vectorLayer, {
  engineType,
  center: {lat: 52.51477270923461, lng: 13.39846691425174},
  zoom: 13,
  pixelRatio: window.devicePixelRatio || 1
});
window.addEventListener('resize', () => map.getViewPort().resize());
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

var ui = H.ui.UI.createDefault(map, defaultLayers);

// bubble function
var bubble;
const openBubble = (position, text) => {
  if (!bubble) {
    bubble = new H.ui.InfoBubble(
      position, {
        content: text
      });
    ui.addBubble(bubble);
  } else {
    bubble.setPosition(position);
    bubble.setContent(text);
    bubble.open();
  }
 }


const addLocationsToMap = (locations) => {
  var group = new  H.map.Group(),
      position,
      i;

  // Add a marker for each location found
  var iconFileName = './images/locationPin-Red.svg';
  for (i = 0;  i < locations.length; i += 1) {
    let location = locations[i];
    marker = new H.map.Marker(location.position);
    marker.label = location.label;
    var icon = new H.map.Icon(iconFileName);
	  marker.setIcon(icon);

    map.addObject(marker);
    marker.addEventListener('pointerenter', function(ev) {
      openBubble(ev.target.getGeometry(), ev.target.label);
    }, false);
  }

  map.addObject(group);
}

window.onload = function() {
    initMap(map);
    locateIPList(["76.33.11.2", "72.167.172.60", "52.103.200.17"]);
}
  