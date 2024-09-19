var connected = false;

var socket = io("http://localhost:5100")

socket.on('new message', (msg) => {
    console.log(msg);
});


socket.on('sb msg', (msg) => {
    addLocationsToMap(msg);
    //insertToDB();
});

const intervalID = setInterval(()=> {
    socket.emit("send message");
}, 500);