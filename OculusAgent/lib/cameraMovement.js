/**
wraps the camera object in a custum object
**/

THREE.KinectControls = function(camera){

  var moveObject = new THREE.Object3D();
  var position = new THREE.Vector3();
  moveObject.position.y = 10;
  moveObject.add( camera );
  position.z = 2;
  position.x = 0;
  position.y = 0;

  this.getObject = function(){
    return moveObject;
  };

  //takes a THREE vector
  this.move = function(newPose){
    position.x = newPose.x;
    position.y = newPose.y;
    position.z = newPose.z;
  };

  //delta Time passed since last update *Notused*
  //vrstate the possiton of the oculous rift *Notused*
  this.update = function (delta ){
    camera.position.x = position.x;
    camera.position.y = position.y;
    camera.position.z = position.z;
  };
};

