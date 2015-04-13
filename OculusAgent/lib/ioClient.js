var socket = io.connect('http://129.21.208.59:8125',{secure:false});
function openConnection(){
  socket.on('connect', function () {
    console.log('client connected');
    socket.emit('init','{"from" : "Oculus"}');
    //var obj = { size : 20, name: "Jason" };
    //var data = JSON.stringify(obj);
    //socket.emit('data', data);
  });

  socket.on('disconnect', function(){
    console.log("opps client disconnect");
  });

  socket.on('move',function(data){
    console.log("moving torso");
    controls.move(data.move);
  });

  socket.on('draw',function(data){
    var start = new THREE.Vector3(data.start.x,data.start.y,data.start.z);
    var end = new THREE.Vector3(data.stop.x,data.stop.y,data.z);
    drawLine(start,end,data.color);
  });

  socket.on('color',function(data){
    colorChange(data.color.lhand);
  });

  socket.on('colorWheel',function(data){
    if(data.colorWheel){
      displayColorWheele();
    }else{
      hideColorWheele();
    }
  });
}

function sendColor(color){
  socket.emit('color',color);
}
