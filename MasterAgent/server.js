/**
 * Created by Matthew on 4/5/2015.
 */
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var log = require('./lib/logDrawings.js');
var _ = require('underscore');
var net = require('net');
server.listen(8125);
var oculusAgents = [];
var kinectAgents = [];
var oculus = null;
var lastPoint = null;//[x,y,z]
var color = 0x000000;

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    if(oculus == null){
        oculus = socket;
    }

    socket.on('init',function(data){
        receivedInit(data,socket);
    });

});

io.on('color',function(data){
  color = data;
});

var tcp_server = net.createServer(function(socket){

    socket.on('data', function (data) {
        receivedData(data);
    });
    socket.on('init',function(data){
        receivedInit(data,socket);
    });
    socket.on('end',function(){
        console.log("Closed Connection");
    });

    socket.on('error',function(){
        console.log("Had Error");
    });

});
tcp_server.listen(8126);

receivedData = function(data){
    try {
        var buf = new Buffer(data,"base64")
        console.log(buf.substring(1));
        res = JSON.parse(buf.substring(1));
    }catch(ex){
        console.log("parse error");
        return;
    }
    id = res.from;
    if(id.substring(0,id.length-1) == "Oculus"){
        console.log("Message from Oculus1");
        console.log("Oculus should only init with the server");

    }else if(id.substring(0,id.length-1) == "Kinect" && res.data != ""){
        //log.writeToLog(res);
        if(oculus != null){
            io.to('oculusPaintRoom').emit('mov',res['data']['Torso'])
            if(res['data']['RHand']['active']==true){
                rHand = res['data']['RHand'];
                newPoint =[RHand.x,RHand.y,RHand.z];
                if(lastPoint == null){
                  lastPoint = newPoint;
                }else{
                  io.to('oculusPaintRoom').emit('draw',oldPoint,newPoint,color);
                  lastPoint = newPoint;
                }
            }

        }
    }
    else {
        console.log("Message not from Oculus or Kinect");
    }
};

receivedInit = function(data,socket){
    socket.join('oculusPaintRoom');
    try {
        res = JSON.parse(data);
    }catch(ex){
        console.log("parse error");
        return;
    }
    if(res.from === "Oculus"){
        console.log("Initing Oculus");
        log.readLog(function(data){
            var obj = JSON.parse(data);
            _.forEach(obj, function(line){
                socket.emit('data',JSON.stringify(line));
            });
        });
    }else if(res.from === "Kinect"){
        console.log("Initing Kinect");
    }
    else {
        console.log("Message not from Oculus or Kinect");
    }
};