
var noise = new Noise();
let time = 0;


function animate(){
    requestAnimationFrame(animate);
    time+=0.001;
    updatePlaneWithNoise();
    renderer.render(scene, camera)
}


const updatePlaneWithNoise = () => {
    const vertices = plane.geometry.attributes.position.array;
    const colors = plane.geometry.attributes.color.array;

    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];

        // Use noise to displace the vertices over time
        const noiseValue = noise.simplex2(x * 0.1, y * 0.1 + time) * 2;
        vertices[i + 2] = noiseValue;

        // Map the noise value to a color gradient (Red at minimum, Blue at maximum)
        const color = new THREE.Color();
        const normalizedValue = (noiseValue + 1) / 2; // Normalize noise value to range [0, 1]
        const redComponent = normalizedValue; // Red component varies based on noise value
        color.setRGB(redComponent, 0, 1 - redComponent); // Green and blue are set accordingly
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    // Update the buffer geometry
    plane.geometry.attributes.position.needsUpdate = true;
    plane.geometry.attributes.color.needsUpdate = true;
};


