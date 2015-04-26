var socket = io.connect('http://129.21.208.59:8125',{secure:false});
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
    var start = new THREE.Vector3(data[0][0],data[0][1],data[0][2]);
    var end = new THREE.Vector3(data[1][0],data[1][1],data[1][2]);
    drawLine(start,end,data[2]);
  });
}
