var linesDrawn = [];

/*
start - the start possition for a line as a vector3
stop - the end position for a line as a vector 3
color - the color of the line as hex
*/

function drawLine(start, stop, color){
    //console.log("Drawing Start: " + start.x + " Stop: " + stop.x);

    var geometry = new THREE.Geometry();
    geometry.vertices.push(start);
    geometry.vertices.push(stop);

    var material = new THREE.LineBasicMaterial({
        color: color,
        linewidth: 4,
        });

    var line = new THREE.Line(geometry, material);

    linesDrawn.push(line);
    this.scene.add( line );
}

function removeAllLines(){
    for(var i=0;i<linesDrawn.length;i++){
        scene.remove(linesDrawn[i]);
    }
    linesDrawn = [];
}
