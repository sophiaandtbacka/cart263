import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
//import fragmentShader from "./Sphere.fragment.glsl?raw";
//import vertexShader from "./Sphere.vertex.glsl?raw";

import { Blob } from './blob.js';
import { Line } from './lightLine.js';


// --- Core Setup ---
//Outside scene, has blob and light line
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffe3e7); // pink background

//Inside scene, just black void rn
const scene1 = new THREE.Scene();
scene1.background = new THREE.Color(0x000000);

let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
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


// --- Blob and Light Line ---
const line = new Line(scene);
const blob = new Blob(scene, line.samplePoints);


// --- Moving Variables ---
let targetCameraPos = new THREE.Vector3();
let isMoving = false;
let state = {
    mode: "outside",
    targetBlob: null, //null means nothing is selected rn
}

//const blobNum = 5;
//this.samplePoints = line.getSpacedPoints(blobNum);
//this.blobs = new THREE.InstancedMesh(blobGeo, blobMat, blobNum);


//let elapsedTime = 0;
function animate(timer) {
    requestAnimationFrame(animate);

    blob.update(timer);

    line.update();

    controls.update();


    //controls camera transition from inside to outside world
    if (isMoving) {
        camera.position.lerp(targetCameraPos, 0.017);//where you're going and how fast

        if (camera.position.distanceTo(targetCameraPos) < 17) {//the rad is 16 and three js rn won't let me enter the geometry so use 17 to overcome this
            isMoving = false;
            enterInsideScene();
        }
    }


    if (state.mode === "outside") {
        renderer.render(scene, camera);
    }

    else if (state.mode === "inside") {
        renderer.render(scene1, camera);
    }


}

animate(0);//starts the animation

function enterInsideScene() {
    state.mode = "inside";
    console.log("entering into inside");

    // reset camera for consistency
    controls.target.set(0, 0, 0);
    camera.position.set(0, 0, 10);

}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});



// Click handler
const mouse = new THREE.Vector2();
const blobRaycaster = new THREE.Raycaster();
renderer.domElement.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;


    //blob inside to outside handler
    blobRaycaster.setFromCamera(mouse, camera);
    const intersects = blobRaycaster.intersectObjects([blob.blobMesh]);
    if (intersects.length > 0) {
        console.log("Blob clicked!");
        console.log(blob.blobMesh.position);
        moveCameraToBlob(blob.blobMesh.position);//stores blob position
        //will do a state change here in the future
    }

    function moveCameraToBlob(targetPoint) {
        const dir = new THREE.Vector3()
            .subVectors(camera.position, targetPoint)
            .normalize();

        const distance = 3; // distance from center

        targetCameraPos.copy(targetPoint).add(dir.multiplyScalar(distance));

        isMoving = true;
    }
});

