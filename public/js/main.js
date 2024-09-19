// Globals
var allLocations = [];

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
  allLocations = allLocations.concat(locations);
  var group = new  H.map.Group(),
      position,
      i;

  // Add a marker for each location found
  for (i = 0;  i < allLocations.length; i += 1) {
    let location = allLocations[i];
    var iconFileName = getSVG(location.event_category);
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
  updateAttackCounter(allLocations.length);
}

const getSVG = (category) => {
  if(category == "Phishing") return './images/locationPin-Red.svg';
  if(category == "Phishing Report") return './images/locationPin-Green.svg';
  if(category == "SuccessfulLogon") return './images/locationPin-Yellow.svg';
  if(category == "LogonFailed") return './images/locationPin-Orange.svg';
  if(category == "Heavy Ingress Traffic") return './images/locationPin-Purple.svg';
  if(category == "Scan Attempts") return './images/locationPin-Aqua.svg';
}

window.onload = function() {
    initMap(map);
    //locateIPList(["76.33.11.2", "72.167.172.60", "52.103.200.17"]);
}

const updateAttackCounter = (val)=> {
  $(".daily-attacks > span").text(val + " ");
}
  
