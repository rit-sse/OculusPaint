//set colorBox to golbal scope
var colorBox;

/*
Takes in the postion of your left hand and sends a message with the color
*/
function colorChange(rHandPos){
  var children = colorBox.children;
  for(var i=0;i<children.length;i++){
    var wrld_pos = children[i].getWorldPosition();
    //checks to see if the hand is inside one of the boxes on the golbal scale
    if(rHandPos.x<wrld_pos.x+0.2 & rHandPos.x>wrld_pos.x-0.2 &
     rHandPos.y<wrld_pos.y+0.2 & rHandPos.y>wrld_pos.y-0.2 &
     rHandPos.z<wrld_pos.z+0.2 & rHandPos.z>wrld_pos.z-0.2){
      console.log(children[i].material.color.getHexString());
      sendColor(children[i].material.color.getHex);
    }
  }
}

//Adds a color to the color box
function colorWheelBox(x,y,z,color){
  var boxGeo = new THREE.Geometry();
  boxGeo.vertices.push(new THREE.Vector3(-0.125,  0.125, 0.0));
  boxGeo.vertices.push(new THREE.Vector3(0.125,  0.125, 0.0));
  boxGeo.vertices.push(new THREE.Vector3(0.125,  -0.125, 0.0));
  boxGeo.vertices.push(new THREE.Vector3(-0.125,  -0.125, 0.0));
  boxGeo.faces.push(new THREE.Face3(0,1,2));
  boxGeo.faces.push(new THREE.Face3(0,2,3));

  var boxMaterial = new THREE.MeshBasicMaterial({
    color: color,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.66
  });

  var box = new THREE.Mesh(boxGeo, boxMaterial);
  box.position.set(x,y,z);

  return box;
}

//adds the color wheel object to the scene
function addColorWheel(){
  //main box
  var colorBoxGeo = new THREE.Geometry();
  colorBoxGeo.vertices.push(new THREE.Vector3(-0.3,  0.3, 0.0));
  colorBoxGeo.vertices.push(new THREE.Vector3(0.3,  0.3, 0.0));
  colorBoxGeo.vertices.push(new THREE.Vector3(0.3,  -0.3, 0.0));
  colorBoxGeo.vertices.push(new THREE.Vector3(-0.3,  -0.3, 0.0));
  colorBoxGeo.faces.push(new THREE.Face3(0,1,2));
  colorBoxGeo.faces.push(new THREE.Face3(0,2,3));

  var colorBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });

  colorBox = new THREE.Mesh(colorBoxGeo, colorBoxMaterial);
  colorBox.position.set(0,0.35,0);
  scene.add(colorBox);
  rHandModel.add(colorBox);

  var redBox = colorWheelBox(-0.15,0.15,0,0xFF0000);
  scene.add(redBox);
  colorBox.add(redBox);

  var blueBox = colorWheelBox(0.15,0.15,0,0x0000FF);
  scene.add(blueBox);
  colorBox.add(blueBox);

  var yellowBox = colorWheelBox(-0.15,-0.15,0,0xFFFF00);
  scene.add(yellowBox);
  colorBox.add(yellowBox);

  var blackBox = colorWheelBox(0.15,-0.15,0,0x000000);
  scene.add(blackBox);
  colorBox.add(blackBox);
}

//function for hiding the color wheel
function hideColorWheele(){
  colorBox.visible = false;
}

//function for unhiding the colorwheel
function displayColorWheele(){
  colorBox.visible = true;
}
