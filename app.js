import {ServiceBusHandler} from "./eventGeo.js";
import express from "express";
import favicon from "serve-favicon";
import { Server } from "socket.io";
import 'dotenv/config';

const app = express();
const port = 5100;

const server = app.listen(port, ()=>{
    console.log("Server listening on port " + port);
});
const io = new Server(server);

app.set("view engine", "pug"); //telling the server that we're using pug as the template engine
app.set("views", "views"); //all views will be in the views folder

app.use(express.static("public")); //serve public files
app.use(favicon('public/favicon.ico')); //serve favicon

app.get("/", (req, res, next)=> { 
    
    var payload = {
        pageTitle : "Threat Map",
        apiKey: process.env.API_KEY
    }
    res.status(200).render("home", payload);
})


const handler = new ServiceBusHandler();

io.on("connection", socket => {
    console.log('Client connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    socket.emit('new message', "hello hello");
    
    socket.on('send message', ()=> {
        //socket.emit('new message', "received request to get messages from queue");
        handler.receiveGeoInfo("outputgeoinfo").then((location)=> {
            socket.emit('sb msg', location);
        });
    })
});

