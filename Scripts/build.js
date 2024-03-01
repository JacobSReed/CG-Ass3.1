function createPlane(w, h, ws, hs, x, y, z, hexColour) {
    const geometry = new THREE.PlaneBufferGeometry(w, h, ws, hs); // Use PlaneBufferGeometry
    geometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(geometry.attributes.position.array.length), 3)); // Add color attribute
    
    const material = new THREE.MeshBasicMaterial({ vertexColors: THREE.VertexColors, side: THREE.DoubleSide, wireframe: true });
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(x, y, z);

    return plane;
}

var plane = createPlane(100,100,100,100,0,20,0, "red");

function addShapes() {
    scene.add(plane);
}