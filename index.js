const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const socketio = require("socket.io");
// making http server
const http = require("http");
const server = http.createServer(app);
const io = socketio(server)// mounting server inside socketio
let users = {};
// console.log(io);
io.on('connection',(socket)=>{
    console.log("connection established");
    // recieving event 
    socket.on("send-msg",(data)=>{
        console.log(data);
        io.emit("recieved-msg",{
            msg : data.msg,
            // id : socket.id
            username : users[socket.id]
        })
    })
    socket.on("login",(data)=>{
        users[socket.id] = data.username;
    })
});
// setting up public folder
app.use("/",express.static(path.join(__dirname,'public')));
// app.get("/",(req,res)=>{
//     res.send("hello");
// })
server.listen(port,function(){
    console.log(`server connected at port ${port}`);
})