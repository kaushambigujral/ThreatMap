const urlPrefix = "http://ip-api.com/json/";

const locateIP = (ipAddress) => {
    var location = [0, 0];
    $.get(`${urlPrefix}${ipAddress}`, (data, status) => {
        if(status == "success"){
            location[0] = data.lat;
            location[1] = data.lon;
        }
    })
    .then(()=> {
        console.log(location);
    });
}
