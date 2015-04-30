function checkerboard(segments) {
  var geometry, i, j, materialEven, materialOdd, materials, x, y, _i, _j;
  if (segments == null) {
    segments = 8;
  }
  geometry = new THREE.PlaneGeometry(100, 100, segments, segments);
  materialEven = new THREE.MeshBasicMaterial({
    color: 0xccccfc
  });
  materialOdd = new THREE.MeshBasicMaterial({
    color: 0x444464
  });
  materials = [materialEven, materialOdd];
  for (x = _i = 0; 0 <= segments ? _i < segments : _i > segments; x = 0 <= segments ? ++_i : --_i) {
    for (y = _j = 0; 0 <= segments ? _j < segments : _j > segments; y = 0 <= segments ? ++_j : --_j) {
      i = x * segments + y;
      j = 2 * i;
      geometry.faces[j].materialIndex = geometry.faces[j + 1].materialIndex = (x + y) % 2;
    }
  }
  return new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
};
