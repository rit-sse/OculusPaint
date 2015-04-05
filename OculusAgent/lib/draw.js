var lineColor = 0x000000;
var colorPos = [];

function drawLine(start, stop){


    console.log("Drawing Start: " + start.x + " Stop: " + stop.x);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(stop);

    var material = new THREE.LineBasicMaterial({
        color: lineColor,
        linewidth: 4,
        });

    var line = new THREE.Line(geometry, material);

    this.scene.add( line );
}

function colorChange(lHandPos){

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

  var colorBox = new THREE.Mesh(colorBoxGeo, colorBoxMaterial);
  colorBox.position.set(-0.5,0.4,-1);
  scene.add(colorBox);
  camera.add(colorBox);

  //red color
  var redBoxGeo = new THREE.Geometry();
  redBoxGeo.vertices.push(new THREE.Vector3(-0.125,  0.125, 0.0));
  redBoxGeo.vertices.push(new THREE.Vector3(0.125,  0.125, 0.0));
  redBoxGeo.vertices.push(new THREE.Vector3(0.125,  -0.125, 0.0));
  redBoxGeo.vertices.push(new THREE.Vector3(-0.125,  -0.125, 0.0));
  redBoxGeo.faces.push(new THREE.Face3(0,1,2));
  redBoxGeo.faces.push(new THREE.Face3(0,2,3));

  var redBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xFF0000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  });

  var redBox = new THREE.Mesh(redBoxGeo, redBoxMaterial);
  redBox.position.set(-0.725,0.675,-1);
  scene.add(redBox);
  colorBox.add(redBox);
  colorPos.push({x1:0.85,x2:0.6,y1:0.55,y2:0.8,object:redBox});

  //blue color
  var blueBoxGeo = new THREE.Geometry();
  blueBoxGeo.vertices.push(new THREE.Vector3(-0.125,  0.125, 0.0));
  blueBoxGeo.vertices.push(new THREE.Vector3(0.125,  0.125, 0.0));
  blueBoxGeo.vertices.push(new THREE.Vector3(0.125,  -0.125, 0.0));
  blueBoxGeo.vertices.push(new THREE.Vector3(-0.125,  -0.125, 0.0));
  blueBoxGeo.faces.push(new THREE.Face3(0,1,2));
  blueBoxGeo.faces.push(new THREE.Face3(0,2,3));

  var blueBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0x0000FF,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  });

  var blueBox = new THREE.Mesh(blueBoxGeo, blueBoxMaterial);
  blueBox.position.set(-0.3,0.675,-1);
  scene.add(blueBox);
  colorBox.add(blueBox);

  //yellow color
  var yellowBoxGeo = new THREE.Geometry();
  yellowBoxGeo.vertices.push(new THREE.Vector3(-0.125,  0.125, 0.0));
  yellowBoxGeo.vertices.push(new THREE.Vector3(0.125,  0.125, 0.0));
  yellowBoxGeo.vertices.push(new THREE.Vector3(0.125,  -0.125, 0.0));
  yellowBoxGeo.vertices.push(new THREE.Vector3(-0.125,  -0.125, 0.0));
  yellowBoxGeo.faces.push(new THREE.Face3(0,1,2));
  yellowBoxGeo.faces.push(new THREE.Face3(0,2,3));

  var yellowBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFF00,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  });

  var yellowBox = new THREE.Mesh(yellowBoxGeo, yellowBoxMaterial);
  yellowBox.position.set(-0.725,0.25,-1);
  scene.add(yellowBox);
  colorBox.add(yellowBox);

  //black color
  var blackBoxGeo = new THREE.Geometry();
  blackBoxGeo.vertices.push(new THREE.Vector3(-0.125,  0.125, 0.0));
  blackBoxGeo.vertices.push(new THREE.Vector3(0.125,  0.125, 0.0));
  blackBoxGeo.vertices.push(new THREE.Vector3(0.125,  -0.125, 0.0));
  blackBoxGeo.vertices.push(new THREE.Vector3(-0.125,  -0.125, 0.0));
  blackBoxGeo.faces.push(new THREE.Face3(0,1,2));
  blackBoxGeo.faces.push(new THREE.Face3(0,2,3));

  var blackBoxMaterial = new THREE.MeshBasicMaterial({
    color: 0x000000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.7
  });

  var blackBox = new THREE.Mesh(blackBoxGeo, blackBoxMaterial);
  blackBox.position.set(-0.3,0.25,-1);
  scene.add(blackBox);
  colorBox.add(blackBox);
}
