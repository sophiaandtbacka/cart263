
// library ref: because we are loading a module
import * as THREE from 'three';//import everything * = wildcard/everything at three reference

//SCENE
const scene = new THREE.Scene() //make scene class and adds to THREE


//TURN ON AXES HELPER
//https://threejs.org/docs/?q=Axes#AxesHelper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)
//move it 
axesHelper.position.x = -1;
axesHelper.position.y = -1;


//command backslash to comment ouFt big section
/*
//A: the geometry
const geometry = new THREE.BoxGeometry(1, 1, 1)//makes cube and assigns to Three
//B: the material
const material = new THREE.MeshBasicMaterial({ color: 0x800080 })//a type of material provided, and add color to mat
//C: put together
const mesh = new THREE.Mesh(geometry, material)//mesh = geo and mat

mesh.scale.x = 2//makes x double
mesh.scale.y = 0.25
mesh.scale.z = 0.5


mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25

//if you want rotation you can also use quanternion
//rotation order maters


//D: ADD TO THE SCENE
scene.add(mesh)//adding mesh to scene class

const mesh_2 = new THREE.Mesh(geometry, material)
scene.add(mesh_2)
mesh_2.position.x = 1.5
mesh_2.position.y = 1.25
mesh_2.position.z = -1
*/


//Texture, img gonna wrap around geometry 
const loader = new THREE.TextureLoader();
const water_texture = await loader.loadAsync('textures/Ice002_1K-JPG_Color.jpg');

// const material = new THREE.MeshBasicMaterial(
//     { map: water_texture })
// material.color = new THREE.Color('#ad86dd');

// //material.wireframe = true
// material.transparent = true;
// material.opacity = 0.25;



// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(0.5, 16, 16),
//     material
// )
// sphere.position.x = - 1.5

// //just flat surface
// const plane = new THREE.Mesh(
//     new THREE.PlaneGeometry(1, 1),
//     material
// )

// const torus = new THREE.Mesh(
//     new THREE.TorusGeometry(0.5, 0.3, 16, 32),
//     material
// )
// torus.position.x = 1.5

// scene.add(sphere, plane, torus)

// //alt to class w objs makes it so param don't have to be rela to ea other
// const group = new THREE.Group()
// scene.add(group)


const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: false })
)
cube1.position.x = 1.5
scene.add(cube1)
// group.add(cube1)
// /*https://threejs.org/docs/#SphereGeometry*/
// const sphere = new THREE.Mesh(
//     new THREE.SphereGeometry(.75, 32, 16),
//     new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
// )
// sphere.position.y = 1.5
// sphere.position.x = 3
// group.add(sphere)


// group.position.x = -2
// group.rotation.x = Math.PI * .25
// // group.scale.x = .5
// // group.scale.y = .5
// // group.scale.z = .5
// group.scale.set(.5, .5, .5)
// //could do
// //camera.lookAt(group.position)



// //need to ensure that the textures are encoded correctly - mapping the colors correctly.
// water_texture.colorSpace = THREE.SRGBColorSpace;




//0,0,0 center of canvas default where obj placed
//at this point haven't rendered



//multiple cameras v heavy so limit amount

//how big do you want view window to be
const sizes = {
    width: 800,
    height: 600
}
//Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)//75 degrees normally default field of view, window width/window height default aspect ratio
scene.add(camera)

//move camera
camera.position.z = 3 //move camera backwards

//look at rotates view port based on target, target must be def with vector, makes so you don't have to calc rotation angle
/*
camera.lookAt(new THREE.Vector3(0, - 1, 0))
//or
camera.lookAt(mesh_2.position)//center of geometry 
//centers target in viewport
*/

//Access the Canvas
const canvas = document.querySelector('canvas#three-ex')
//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
//give it the size
renderer.setSize(sizes.width, sizes.height)

//render:
//renderer.render(scene, camera)

//render has to be the last thing


const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
//scene.add(mesh)



window.requestAnimationFrame(animate)
// function animate() {
//     mesh.rotation.y += 0.01
//     renderer.render(scene, camera)
//     window.requestAnimationFrame(animate)

//     // Update objects -> elapsed time increases ...
//     mesh_2.position.x = Math.cos(elapsedTime / 1000)
//     mesh_2.position.y = Math.sin(elapsedTime / 1000)

// }


//if you want to standardize screen and browser refresh rate

let elapsedTime = 0  //
function animate(timer) {
    //calculate the difference since last frame
    let deltaTime = timer - elapsedTime
    elapsedTime = timer //update  new elapsedTime
    cube1.rotation.x += 0.001 * deltaTime
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
    // Update objects -> elapsed time increases ...
    cube1.position.x = Math.cos(elapsedTime / 1000)
    cube1.position.y = Math.sin(elapsedTime / 1000)

}


// const mesh_2 = new THREE.Mesh(geometry, material)
// scene.add(mesh_2)
// mesh_2.position.x = -2

