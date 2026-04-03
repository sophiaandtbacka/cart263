
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'


const scene = new THREE.Scene()
const sizes = {
    width: 800,
    height: 600
}
const canvas = document.querySelector('canvas#three-ex')
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3;
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)


const controls = new OrbitControls(camera, canvas)


//lighting start, if you aren't doing lighting make sure choose geometry that doesn't need light, a lot of geo need light
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({})

const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const mesh_2 = new THREE.Mesh(geometry, material)
scene.add(mesh_2)
mesh_2.position.x = -2

//NEW for casting shadows add a plane:)
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)

scene.add(plane)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = -.5;
plane.position.z = 1;
plane.position.x = -1;

//add light
const ambientLight = new THREE.AmbientLight() //omnidirectional, can give it color and intensity 
ambientLight.color = new THREE.Color(0xff0000);
ambientLight.intensity = .5;
scene.add(ambientLight)

//light will always be base at 0,0, directional large source
const directionalLight = new THREE.DirectionalLight()
directionalLight.color = new THREE.Color(0xFFFFFF)//white light
directionalLight.position.set(-5, 5, 0)
scene.add(directionalLight)


//point light small source
const pointLight = new THREE.PointLight(0xff9000, 1.5)
scene.add(pointLight)
pointLight.position.set(0, 1, 0) //set y 
//set the intensity too
pointLight.intensity = 5
pointLight.distance = 1//distance amount it covers, default is 0 so infinite
pointLight.decay = .5//decay amount it decays over space, basically how concentrated is light in center of same size circle
console.log(pointLight.position) // default position is 0,0,0


//spotlight has most parameters, can set a target for spotlight
const spotLight = new THREE.SpotLight(0x78ff00, 4.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
scene.add(spotLight.target)//default 0,0,0
spotLight.target.position.x = -2//target is property of the js


//shadows

window.requestAnimationFrame(animate);


function animate(timer) {
    controls.update();

    //gets darker over time
    // let x = directionalLight.position.x
    // x += .02
    // directionalLight.position.set(x, 5, 0)

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);


}
