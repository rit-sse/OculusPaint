var colorBox;

function colorChange(lHandPos){
  var children = colorBox.children;
  for(var i=0;i<children.length;i++){
    var wrld_pos = children[i].getWorldPosition();
    //checks to see if the hand is inside one of the boxes on the golbal scale
    if(lHandPos.x<wrld_pos.x+0.2 & lHandPos.x>wrld_pos.x-0.2 &
     lHandPos.y<wrld_pos.y+0.2 & lHandPos.y>wrld_pos.y-0.2 &
     lHandPos.z<wrld_pos.z+0.2 & lHandPos.z>wrld_pos.z-0.2){
      console.log(children[i].material.color.getHexString());
    }
  }
}

function colorWheelBox(x,y,z,color){
  var boxGeo = new THREE.Geometry();
  boxGeo.vertices.push(new THREE.Vector3(-0.2,  0.2, 0.0));
  boxGeo.vertices.push(new THREE.Vector3(0.2,  0.2, 0.0));
  boxGeo.vertices.push(new THREE.Vector3(0.2,  -0.2, 0.0));
  boxGeo.vertices.push(new THREE.Vector3(-0.2,  -0.2, 0.0));
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

function addColorWheel(){
  //main box
  var colorBoxGeo = new THREE.Geometry();
  colorBoxGeo.vertices.push(new THREE.Vector3(-0.25,  0.25, 0.0));
  colorBoxGeo.vertices.push(new THREE.Vector3(0.25,  0.25, 0.0));
  colorBoxGeo.vertices.push(new THREE.Vector3(0.25,  -0.25, 0.0));
  colorBoxGeo.vertices.push(new THREE.Vector3(-0.25,  -0.25, 0.0));
  colorBoxGeo.faces.push(new THREE.Face3(0,1,2));
  colorBoxGeo.faces.push(new THREE.Face3(0,2,3));

  var colorBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.5
  });

  colorBox = new THREE.Mesh(colorBoxGeo, colorBoxMaterial);
  colorBox.position.set(-0.5,0.4,-1);
  scene.add(colorBox);
  camera.add(colorBox);

  var redBox = colorWheelBox(-0.725,0.65,-1,0xFF0000);
  scene.add(redBox);
  colorBox.add(redBox);

  var blueBox = colorWheelBox(-0.3,0.65,-1,0x0000FF);
  scene.add(blueBox);
  colorBox.add(blueBox);

  var yellowBox = colorWheelBox(-0.725,0.2,-1,0xFFFF00);
  scene.add(yellowBox);
  colorBox.add(yellowBox);

  var blackBox = colorWheelBox(-0.3,0.2,-1,0x000000);
  scene.add(blackBox);
  colorBox.add(blackBox);
}

function hideColorWheele(){
  colorBox.visible = false;
}

function displayColorWheele(){
  colorBox.visible = true;
}
