var socket = io.connect('http://129.21.208.59:8127',{secure:false});
function openConnection(){
  socket.on('connect', function () {
    console.log('client connected');
    socket.emit('init','{"from" : "TV"}');
  });

  socket.on('disconnect', function(){
    console.log("opps client disconnect");
  });

  socket.on('move',function(data){
    //camera dosn't move.
  });

  socket.on('draw',function(data){
    var start = new THREE.Vector3(data.start.x,data.start.y,data.start.z);
    var end = new THREE.Vector3(data.stop.x,data.stop.y,data.z);
    drawLine(start,end);
  });
}
