//import * as THREE from 'three';
//import { RGBELoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/RGBELoader.js';

import * as THREE from 'three';
//import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
//using glsl which runs on gpu instead of cpu, faster for graphics because gpu is running multiple things in parallel rather than sequentially like with js and cpu

//I need to set up my files differently to run this
//import vertexShader from "./vertexShader.glsl?raw"; //?raw imports as a strg, need this because we are using .glsl file type instead of .js
//import fragmentShader from "./fragmentShader.glsl?raw";


const vertexShader = `

// GLSL textureless classic 3D noise "cnoise",
// with an RSL-style periodic variant "pnoise".
// Author:  Stefan Gustavson (stefan.gustavson@liu.se)
// Version: 2024-11-07
//
// Many thanks to Ian McEwan of Ashima Arts for the
// ideas for permutation and gradient selection.
//
// Copyright (c) 2011 Stefan Gustavson. All rights reserved.
// Distributed under the MIT license. See LICENSE file.
// https://github.com/stegu/webgl-noise
//

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+10.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise
float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));

  float n000 = norm0.x * dot(g000, Pf0);
  float n010 = norm0.y * dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n100 = norm0.z * dot(g100, vec3(Pf1.x, Pf0.yz));
  float n110 = norm0.w * dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = norm1.x * dot(g001, vec3(Pf0.xy, Pf1.z));
  float n011 = norm1.y * dot(g011, vec3(Pf0.x, Pf1.yz));
  float n101 = norm1.z * dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n111 = norm1.w * dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));

  float n000 = norm0.x * dot(g000, Pf0);
  float n010 = norm0.y * dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n100 = norm0.z * dot(g100, vec3(Pf1.x, Pf0.yz));
  float n110 = norm0.w * dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = norm1.x * dot(g001, vec3(Pf0.xy, Pf1.z));
  float n011 = norm1.y * dot(g011, vec3(Pf0.x, Pf1.yz));
  float n101 = norm1.z * dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n111 = norm1.w * dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}
//End of Borrowed Perlin Noise Code


varying vec3 v_normal;//varying makes it so vector can be passed onto shader

uniform float u_time;//

void main() {

    //direction of surfaces at each vertex in camera/view space
    v_normal = normalize(normalMatrix * normal);
        //Normalizing makes sure magn is 1 which indicates to the program that you are using a direction only not position
        //NormalMatrix converts local positions to camera/view space positions, takes into account scaling and different distortions

    
    //perlin noise in local space
    float noise = pnoise(0.3 * position + vec3(0.0, 0.0, u_time), vec3(500.0));
        //position of vertices (multiply it by factor of how big you want the bumps to be), + vec 3 time will grab new time to animate, +time because position is a vec 3 and if multiply instead of add the effect will be increase over time, 10 = repetition of noise movement (how often are you grabbing the new perlin noise on the perlin noise randomizing graph) impacts how related/smooth you want the changes to be
    
        
    //new position of vertices in local space
    vec3 newPos = position + normal*noise;
        //could technically do with camera space too cuz all you're actually interacting with is camera space but way better for organization like this
        //gives movement to vertices, takes old vertices and adds perlin noise along their normal

    
    //determines where a vertex is going to end up on our screen, controls all the vertices, says vertices going to be in clip space
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
        //vec 4 converting vertex local position to screen position (by adding w), modelView Matrix convert local object space to camera space, projection converts 3D camera space to 2D screen space (with perspective) also called "clip space" makes pixelated calc
        //vec 4: position (x,y,z) of vertex, 1.0 = w meaning normal perspective/normal position, can mess with w to skew perspective and create depth
        //modelViewMatrix: model = world, view = camera (normally world stays stagnant and camera is what moves around)
        //projection = screen/clip space
    
    
}`

const fragmentShader = `
varying vec3 v_normal;

void main() {
    vec3 lightDir = normalize(vec3(2.0, 2.0, 0.0));

    float lightAmount = max(dot(v_normal, lightDir), 0.0);

    gl_FragColor = vec4(vec3(lightAmount)*1.1, 1); //1.1 is intensity of light
    
    // vec3 normal = normalize(v_normal);
    
    // vec3 lightDir = normalize(vec3(2.0, 2.0, 2.0));
    // vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0)); // camera direction

    // // Diffuse
    // float diff = max(dot(normal, lightDir), 0.0);

    // // Specular (this is what makes it "metal")
    // vec3 reflectDir = reflect(-lightDir, normal);
    // float spec = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);

    // // Purple base color
    // vec3 baseColor = vec3(1.0, 0.439, 0.784);

    // // Metallic look = strong specular + tinted color
    // vec3 color = baseColor * diff + vec3(1.0) * spec * 1.5;

    // gl_FragColor = vec4(color, 1.0);
}`


//---NOTES---
//rendering pipeline mesh => vertex shader(rasterization) => fragment shader
//local space (relative to the obj itself), world space (relative to the entire scene)

export class Blob {
    constructor(scene) {
        this.scene = scene;

        // Create blob mesh
        //maybe use dodecahedron instead
        const blobGeometry = new THREE.IcosahedronGeometry(3, 32);//radius, detail (default = 0) it adds more vertices, type of geometry that makes a bunch of triangular faces
        const blobMaterial = new THREE.ShaderMaterial({
            color: 0xffdd33,
            //emissive: 0xffee55,
            //emissiveIntensity: 2.0,
            //roughness: 0.1
            // vertexShader: document.getElementById('vertexshader').textContent,//vertexShader, //projectionMatrix * modelViewMatrix * vec4(position, 1),
            //fragmentShader: document.getElementById('fragmentshader').textContent,//fragmentShader, //{(vec3 colour = vec3(v0: 1, v1: 1, v2: 1)), gl_FragColor = vec4(v0: colour, v1: 1)
            // },

            vertexShader,//expects a str
            fragmentShader,
            uniforms: {//way can pass info along to shader
                u_time: { value: 0.1 },//this value will be updated based on time in the update function
            },
            wireframe: false,
            metalness: 1.0,

            //vertex shader manipulates vertices with perlin noise
            //fragment shader gives different colors



        });

        // const material = new THREE.MeshStandardMaterial({
        //     color: 0xffffff,
        //     metalness: 1.0,
        //     roughness: 0.05, // IMPORTANT: lower = more mirror-like
        // });

        // this.material = material;

        this.mesh = new THREE.Mesh(blobGeometry, blobMaterial);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;

        this.scene.add(this.mesh);

        // -------------------------
        // HDRI ENVIRONMENT (CRITICAL FOR METAL)
        // -------------------------
        // new RGBELoader().load(
        //     'https://threejs.org/examples/textures/equirectangular/royal_esplanade_1k.hdr',
        //     (texture) => {

        //         texture.mapping = THREE.EquirectangularReflectionMapping;

        //         this.scene.environment = texture;
        //         this.scene.background = texture;
        //     }
        // );

        // -------------------------
        // LIGHTS (keep but don't overdo)
        // -------------------------
        //     const light1 = new THREE.DirectionalLight(0xffffff, 2);
        //     light1.position.set(5, 5, 5);
        //     scene.add(light1);

        //     const light2 = new THREE.DirectionalLight(0xffffff, 1);
        //     light2.position.set(-5, -3, -2);
        //     scene.add(light2);

        //     const ambient = new THREE.AmbientLight(0xffffff, 0.2);
        //     scene.add(ambient);

        //     // -------------------------
        //     // NOISE SHADER (optional deformation)
        //     // -------------------------
        //     const noiseGLSL = `
        // vec3 mod289(vec3 x){return x - floor(x*(1.0/289.0))*289.0;}
        // vec4 permute(vec4 x){return mod289(((x*34.0)+10.0)*x);}
        // vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}

        // float cnoise(vec3 P){
        //     vec3 Pi = floor(P);
        //     vec3 Pf = fract(P);

        //     vec4 ix = vec4(Pi.x, Pi.x+1.0, Pi.x, Pi.x+1.0);
        //     vec4 iy = vec4(Pi.y, Pi.y, Pi.y+1.0, Pi.y+1.0);

        //     vec4 ixy = permute(permute(ix) + iy);

        //     vec4 gx = fract(ixy * 0.0243902439) * 2.0 - 1.0;

        //     vec3 g = normalize(vec3(gx.x, gx.y, gx.z));

        //     return dot(g, Pf);
        // }
        // `;

        //     material.onBeforeCompile = (shader) => {

        //         shader.uniforms.u_time = { value: 0 };
        //         this.shader = shader;

        //         shader.vertexShader =
        //             `
        //         uniform float u_time;
        //         ${noiseGLSL}
        //         ` + shader.vertexShader;

        //         shader.vertexShader = shader.vertexShader.replace(
        //             '#include <begin_vertex>',
        //             `
        //         #include <begin_vertex>

        //         float noise = cnoise(position * 0.5 + vec3(u_time));

        //         transformed += normal * noise * 0.4;
        //         `
        //         );
        //     };

        // // Add glow effect
        // const glowGeometry = new THREE.SphereGeometry(3.3, 32, 32);
        // const glowMaterial = new THREE.MeshBasicMaterial({
        //     color: 0xffaa33,
        //     transparent: true,
        //     opacity: 0.3
        // });
        // this.glow = new THREE.Mesh(glowGeometry, glowMaterial);
        // this.glow.castShadow = false;
        // this.scene.add(this.glow);


    }

    update(time) {
        // Pulse slightly
        const pulse = 1 + Math.sin(time * 0.002) * 0.02;
        this.mesh.scale.set(pulse, pulse, pulse);
        //this.glow.scale.set(pulse * 1.1, pulse * 1.1, pulse * 1.1);

        this.mesh.material.uniforms.u_time.value = time * 0.001;//sets the u_time value to get it's input from time in seconds

        if (this.shader) {
            this.shader.uniforms.u_time.value = time * 0.001;
        }

        //maybe do this with my blob in frag shader
        // Flicker light slightly
        //this.light.intensity = 2.5 + Math.sin(time * 0.01) * 0.2;
    }
}