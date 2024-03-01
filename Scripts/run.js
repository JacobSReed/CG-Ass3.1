setScene();
addShapes();
animate();
window.addEventListener('resize', resizeScene);

var animationId;

function updateParameters() {
    timeRate = parseFloat(document.getElementById('timeRateInput').value) || 0.001;
    startColour = document.getElementById('startColorInput').value || "#FF0000";
    endColour = document.getElementById('endColorInput').value || "#0000FF";
    noiseScale = document.getElementById('noiseScaleInput').value || 2;
    const wireframeCheckbox = document.getElementById('wireframeCheckbox');
    const wireframeMode = wireframeCheckbox.checked;
    plane.material.wireframe = wireframeMode;
    cancelAnimationFrame(animationId);
    animate();
}

function animate() {
    time += timeRate;
    updatePlaneWithNoise(startColour, endColour);
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
}


