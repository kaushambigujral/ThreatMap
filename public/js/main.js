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
// var infoBubble = new H.ui.InfoBubble({
//   content: '<div style="width: 200px; height: 150px; background-color: #fff; padding: 10px;">' +
//       '<h2>Card Title</h2>' +
//       '<p>Card content goes here.</p>' +
//       '</div>'
// });

var bubble;
const openBubble = (position, text) => {
  console.log("Open Bubble!!!");
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
  for (i = 0;  i < locations.length; i += 1) {
    let location = locations[i];
    marker = new H.map.Marker(location.position);
    marker.label = location.label;
    //marker.icon = new H.map.Icon('/images/locationPin.svg'); //custom icon
    group.addObject(marker);
  }

  
  group.addEventListener('tap', function (evt) {
    openBubble(evt.target.getGeometry(), evt.target.label);
  }, false);

  // Add the locations group to the map
  map.addObject(group);
}
const logEvent = () => {
  console.log("Event");
}

window.onload = function() {
    initMap(map);
    locateIP("76.33.11.2");
}
  