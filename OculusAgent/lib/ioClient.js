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
    controls.move(data[0].Torso);
    hands.moveHand(data.LHand,data.RHand);
  });

  //takes the start, stop, and color out of the data and draws a line
  socket.on('draw',function(data){
    var start = new THREE.Vector3(data[0][0],data[0][1],data[0][2]);
    var end = new THREE.Vector3(data[1][0],data[1][1],data[1][2]);
    drawLine(start,end,data[2]);
  });

  //calls the function to select a color with the lhand pos
  socket.on('selectMenu',function(data){
    colorChange(new THREE.Vector3(data[0],data[1],data[2]));
  });
  //toggle color wheel
  socket.on('colorWheel',function(data){
    if(data){
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
