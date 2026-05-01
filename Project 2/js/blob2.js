//haven't been able to make same perlin movement

import * as THREE from 'three';
import { ImprovedNoise } from 'three/addons/math/ImprovedNoise.js';


export class Blob {
    constructor(scene) {
        /**
 * Lights
 */
        const ambientLight = new THREE.AmbientLight()
        ambientLight.color = new THREE.Color(0xffffff)
        ambientLight.intensity = .9;
        scene.add(ambientLight);

        //Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
        scene.add(directionalLight)
        directionalLight.position.set(-5, 5, 0)

        const geometry_iso = new THREE.IcosahedronGeometry(1, 50); // High detail for smoothness
        const positionAttribute = geometry_iso.getAttribute('position');
        const vertex = new THREE.Vector3();

        const perlin = 'new ImprovedNoise()';


        //apply perlin noise to the verticies
        for (let i = 0; i < positionAttribute.count; i++) {
            vertex.fromBufferAttribute(positionAttribute, i);
            const value = perlin.noise(vertex.x, vertex.y, vertex.z); // Returns a value between -1 and 1
            vertex.multiplyScalar(1 + value * .5);

            positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
        }
        geometry_iso.computeVertexNormals(); // Recalculate light reflections for the new shape


        const material_iso = new THREE.MeshStandardMaterial({
            color: "#f6f198",
            roughness: 0.7,
            metalness: 1.0,
            emissive: "#9d043a",
            emissiveIntensity: 0.4,
        });

        const material_iso2 = new THREE.MeshStandardMaterial({
            color: "#0ebab2",
            roughness: 0.7,
            metalness: 1.0,
            emissive: "#ce4b09",
            emissiveIntensity: 0.4,
        });

        const material_iso3 = new THREE.MeshStandardMaterial({
            color: "#f679a9",
            roughness: 0.63,
            metalness: 1.0,
            emissive: "#a8beda",
            emissiveIntensity: 0.4,
        });

        let specialForm = new THREE.Mesh(geometry_iso, material_iso);
        specialForm.position.y = 0.5;
        scene.add(specialForm);
    }
}