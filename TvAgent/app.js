window.addEventListener("load", function(){
  initScene();
  initRenderer();
  openConnection();
  render();
}, false);

//This is were you init the scene
function initScene() {
  camera = new THREE.PerspectiveCamera(60, 1280 / 800, 0.001, 100);
  scene = new THREE.Scene();
  scene.add(camera);
  camera.position.z = 1.5;
  camera.position.y = 0.5;
  camera.lookAt(new THREE.Vector3(0,0,0));

  var ambient = new THREE.AmbientLight( 0x2277EE );
  scene.add( ambient );

  var directionalLight = new THREE.DirectionalLight( 0xffffff );
  directionalLight.position.set( 0, 1, 0 ).normalize();
  scene.add( directionalLight );

  // model

  var onProgress = function ( xhr ) {
    if ( xhr.lengthComputable ) {
      var percentComplete = xhr.loaded / xhr.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };

  var onError = function ( xhr ) {
    console.log("FAIL.");
  };


  THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

  var loader = new THREE.OBJMTLLoader();
  loader.load( 'http://127.0.0.1:8000/view/lab.obj', 'http://127.0.0.1:8000/view/lab.mtl', function ( object ) {

    object.position.y =  -2;
    scene.add( object );

  }, onProgress, onError );
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
