// Globals
var locations = [];
const urlPrefix = "http://ip-api.com/json/";

const locateIPList = (ipAddressList) => {
    ipAddressList.forEach(ip => {
        locateIP(ip);
    });
}
const locateIP = (ipAddress) => {
    var location = {};
    location.position = {};
    location.position.lat = 0;
    location.position.lng = 0;
    location.label = "";
    $.get(`${urlPrefix}${ipAddress}`, (data, status) => {
        if(status == "success"){
            //console.log(data);
            location.position.lat = data.lat;
            location.position.lng = data.lon;
            location.label = `${data.city}, ${data.region}, ${data.country}`;
        }
    })
    .then(()=> {
        locations.push(location);
        addLocationsToMap(locations);
    });
}
