/**
 * Created by Matthew on 4/5/2015.
 */
var app = require('express')();
var server = require('http').Server(app);
var tvServer = require('http').Server(app);
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
var rHandLastState = 'closed';
var lHandLastState = 'closed';

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    
    socket.on('init',function(data){
        receivedInit(data,socket);
    });

    socket.on('color',function(data){
	color = data;
    });

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

    socket.on('restart',function(){
    });

});
tcp_server.listen(8126);

receivedData = function(data){
    var buf = new Buffer(data,"base64");
    try {
	res = JSON.parse("[" + buf.toString().substring(1) + "]");
    }catch(ex){
        console.log("parse error");
	return;
    }
    id = res[0].from;
    if(id.substring(0,id.length-1) == "Oculus" || id.substring(0,id.legth-1) == "TV"){
        console.log("Message from Oculus or TV");
        console.log("Oculus and TV should only init with the server");

    }else if(id.substring(0,id.length-1) == "Kinect" && res.data != ""){
        if(oculus != null){
            io.to('oculusPaintRoom').emit('move',res[0]['data']);
            lHand = res[0]['data']['RHand'];
	    rHand = res[0]['data']['LHand'];
	    newPoint = [rHand.x,rHand.y,rHand.z];
            rHandState = rHand['state'];
	    lHandState = lHand['state'];
	    if(rHandState == 'true'){
                rHandState = rHandLastState;
	    }
	    if(lHandState == 'true'){
                lHandState = lHandLastState;
	    }
	    
	    if(rHandState !='closed' && lHandState != 'open'){
	    	io.to('oculusPaintRoom').emit('colorWheel',false);
                if(lastPoint == null){
                  lastPoint = newPoint;
                }else{
 		  io.to('oculusPaintRoom').emit('draw',[lastPoint,newPoint,color]);
		  if(tv != null){
                      io.to('oculusPaintRoom').emit('draw',[lastPoint,newPoint,color]);
		  }
                }
		
            }else if(lHandState == 'open'){
	      if(rHandState == 'open'){
                  io.to('oculusPaintRoom').emit('selectMenu',newPoint);
	      }
	      io.to('oculusPaintRoom').emit('colorWheel',true);
	    }else{
	      io.to('oculusPaintRoom').emit('colorWheel',false);
	      lastPoint = newPoint;
            }
	    rHandLastState = rHandState;
	    lHandLastState = lHandState;
	    lastPoint = newPoint;
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
    	if(oculus == null){
            oculus = socket;
	}
        console.log("Initing Oculus");
        log.readLog(function(data){
            var obj = JSON.parse(data);
            _.forEach(obj, function(line){
                socket.emit('data',JSON.stringify(line));
            });
        });
    }else if(res.from === "Kinect"){
        console.log("Initing Kinect");
    }else if(res.from == "TV"){
        if(tv == null){
            tv = socket;
	}
    }else {
        console.log("Message not from Oculus or Kinect");
    }
};