var noise = new Noise(Math.random());
let time = 0;

var timeRate = 0.001;
var startColour = "#FF0000";
var endColour = "#0000FF";

function animate() {
    requestAnimationFrame(animate);
    time += timeRate;
    updatePlaneWithNoise(startColour, endColour); // Example hex values for red and blue
    renderer.render(scene, camera);
}

const hexToThreeColor = hex => {
    const color = new THREE.Color();
    color.set(hex);
    return color;
};

const updatePlaneWithNoise = (startHexColour, endHexColour) => {
    const startColor = hexToThreeColor(startHexColour);
    const endColor = hexToThreeColor(endHexColour);

    const vertices = plane.geometry.attributes.position.array;
    const colors = plane.geometry.attributes.color.array;

    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        const noiseValue = noise.simplex2(x * 0.1, y * 0.1 + time) * 2;
        vertices[i + 2] = noiseValue;

        // Map the noise value to a color gradient using lerp
        const color = new THREE.Color();
        const normalizedValue = (noiseValue + 1) / 2;
        color.copy(startColor).lerp(endColor, normalizedValue);

        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    // Update the buffer geometry
    plane.geometry.attributes.position.needsUpdate = true;
    plane.geometry.attributes.color.needsUpdate = true;
};
