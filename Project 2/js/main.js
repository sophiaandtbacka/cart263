import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import fragmentShader from "./Sphere.fragment.glsl?raw";
//import vertexShader from "./Sphere.vertex.glsl?raw";

import { Blob } from './blob.js';

// --- Core Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe3e7); // pink background

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 30, 60);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.maxDistance = 150;
controls.minDistance = 20;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0x080812); // Dim ambient for space
scene.add(ambientLight);


// --- Create Sun (center of solar system) ---
const blob = new Blob(scene);



let elapsedTime = 0;
function animate(timer) {
    requestAnimationFrame(animate);

    const delta = 0.001 * (timer - elapsedTime);
    //console.log(delta)
    elapsedTime = timer;

    // Update sun
    blob.update(timer);



    controls.update();
    renderer.render(scene, camera);
}

animate(0);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Click handler
const mouse = new THREE.Vector2();
renderer.domElement.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    //planetF.click(mouse, scene, camera);
});