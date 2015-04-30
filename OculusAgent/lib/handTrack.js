var lHandModel, rhandModel;

THREE.HandTracking = function(){

  var positionL = new THREE.Vector3();
  positionL.z = 0;
  positionL.x = 0;
  positionL.y = 0;

  var positionR = new THREE.Vector3();
  positionR.z = 0;
  positionR.x = 0;
  positionR.y = 0;

  var lGeo = new THREE.SphereGeometry(0.01);
  var lMat = new THREE.MeshBasicMaterial( {color: 0x000000} );
  lHandModel = new THREE.Mesh(lGeo, lMat);
  scene.add(lHandModel);

  var rGeo = new THREE.SphereGeometry(0.01);
  var rMat = new THREE.MeshBasicMaterial( {color: 0x000000} );
  rHandModel = new THREE.Mesh(rGeo, rMat);
  scene.add(rHandModel);

  this.moveHand = function (lHand,rHand){
    positionL.x = lHand.x;
    positionL.y = lHand.y;
    positionL.z = lHand.z;
    positionR.x = rHand.x;
    positionR.y = rHand.y;
    positionR.z = rHand.z;
  };

  this.colorChange = function(color){
    lHandModel.material.color.setHex(color);
    rHandModel.material.color.setHex(color);
  }

  this.update = function (){
    lHandModel.position.x = positionL.x;
    lHandModel.position.y = positionL.y;
    lHandModel.position.z = positionL.z;
    rHandModel.position.x = positionR.x;
    rHandModel.position.y = positionR.y;
    rHandModel.position.z = positionR.z;
  };
};
