var socket = io.connect('http://129.21.208.59:8125',{secure:false});
//starts the conection to the server
function openConnection(){
  socket.on('connect', function () {
    console.log('client connected');
    socket.emit('init','{"from" : "Oculus"}');
  });


  socket.on('disconnect', function(){
    console.log("opps client disconnect");
  });

  socket.on('move',function(data){
    console.log("moving torso");
    controls.move(data.move);
  });

//takes the start, stop, and color out of the data and draws a line
  socket.on('draw',function(data){
    var start = new THREE.Vector3(data.start.x,data.start.y,data.start.z);
    var end = new THREE.Vector3(data.stop.x,data.stop.y,data.z);
    drawLine(start,end,data.color);
  });

  //calls the function to select a color with the lhand pos
  socket.on('color',function(data){
    colorChange(data.color.lhand);
  });
  //toggle color wheel
  socket.on('colorWheel',function(data){
    if(data.colorWheel){
      displayColorWheele();
    }else{
      hideColorWheele();
    }
  });
}

//helper function to send the new color to the server
function sendColor(color){
  socket.emit('color',color);
}
