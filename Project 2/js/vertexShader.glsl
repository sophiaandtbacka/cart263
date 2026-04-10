//vertex takes a 3D mesh and displays correct position on screen

//vectors: vertex = position, normal = direction (perpindicular to face going outward)(default magn = 1)

varying vec3 vNormal; //varying (only in glsl) means variable passes onto fragment shader

void main() {
    //only used in frag shader
   // v_normal = normal; //get normal from mesh, so can pass to frag shader

//don't understand this bit yet
   // vNormal = (modelMatrix * vec4(normal, 1.0)).xyz; //transforms into camera space

//working gpt lighting
    vNormal = normalize(normalMatrix * normal);

    //determines where a vertex is going to end up on our screen, controls all the vertices, says vertices going to be in clip space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); 
    //vec 4 converting vertex local position to screen position (by adding w), modelView Matrix convert local object space to camera space, projection converts 3D camera space to 2D screen space (with perspective) also called "clip space" makes pixelated calc
    //vec 4: position (x,y,z) of vertex, 1.0 = w meaning normal perspective/normal position, can mess with w to skew perspective and create depth
    //modelViewMatrix: model = world, view = camera (normally world stays stagnant and camera is what moves around)
    //projection = screen
}
