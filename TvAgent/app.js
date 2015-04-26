window.addEventListener("load", function(){
  initScene();
  initRenderer();
  fullScreen();
  openConnection();
  render();
}, false);


function fullScreen(){
  window.addEventListener("keypress", function(e) {
  if (e.charCode == 'f'.charCodeAt(0)) {
      if (renderCanvas.mozRequestFullScreen) {
        renderCanvas.mozRequestFullScreen();
      } else if (renderCanvas.webkitRequestFullscreen) {
        renderCanvas.webkitRequestFullscreen();
      }
    }
  }, false);
}

//This is were you init the scene
function initScene() {
  camera = new THREE.PerspectiveCamera(60, 1280 / 800, 0.001, 100);
  scene = new THREE.Scene();
  scene.add(camera);
  camera.position.z = 2;
  camera.position.y = 1.5;
  camera.lookAt(new THREE.Vector3(0,0,0));

  var segments = 8;

  var geoFloor = new THREE.PlaneGeometry(100, 100, segments, segments);
  var matEven = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
  });
  var matOdd = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF
  });

  var materials = [matEven, matOdd];
  var i;

  for( i = 0; i<segments*segments; i ++ ) {
      var k = i * 2;
      geoFloor.faces[ k ].materialIndex = i % 2;
      geoFloor.faces[ k + 1 ].materialIndex = i % 2;
  }


  var floor = new THREE.Mesh(geoFloor, new THREE.MeshFaceMaterial(materials));

  floor.position.y = -1.9;//make it on the ground
  floor.rotation.x = -Math.PI/2; //rotate it to the ground

  scene.add(floor);
}

//set up the renderer for the oculous using THREE
function initRenderer() {
  renderCanvas = document.getElementById("render-canvas");
  renderer = new THREE.WebGLRenderer({
    canvas: renderCanvas,
  });
  renderer.setClearColor(0x555555);
  renderer.setSize(1280, 800, false);
}

//render loop
var time = Date.now();
var degree = 0;
function render() {
  requestAnimationFrame(render);
  camera.position.z = (Math.PI * 1.5) * Math.sin(degree);
  camera.position.x = (Math.PI * 1.5) * Math.cos(degree);
  camera.lookAt(new THREE.Vector3(0,0,0));
  degree = (degree+0.01)%360;
  renderer.render( scene, camera );
}
