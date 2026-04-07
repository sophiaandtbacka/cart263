import * as THREE from 'three';

// Planet class for Team B
export class PlanetB {
    constructor(scene, orbitRadius, orbitSpeed) {
        this.scene = scene;
        this.orbitRadius = orbitRadius;
        this.orbitSpeed = orbitSpeed;
        this.angle = Math.random() * Math.PI * 2;

        //Create planet group
        this.group = new THREE.Group()

        // Create planet
        //STEP 1:
        //TODO: Create a planet using THREE.SphereGeometry (Radius must be between 1.5 and 2).
        //TODO: Give it a custom material using THREE.MeshStandardMaterial.
        //TODO: Use castShadow and receiveShadow on the mesh and all future ones so they can cast and receive shadows.
        //TODO: Add the planet mesh to the planet group.

        //create planet B, red and blue metal planet
        const geometryPlanetB = new THREE.SphereGeometry(1.5, 64, 64);//give planet radius, width segments (64 is max), height segments (64 is max), width and height makes it as round as can be
        const materialPlanetB = new THREE.MeshStandardMaterial({
            color: 0x3d88b3,//0x makes it a hex decimal instead of rgb
            emissive: 0x852929,
            emissiveIntensity: .5,//default 1
            flatShading: false,
            metalness: .9,
            roughness: .7,
        });//color of planet, emissive color it emits, flat shading shaded the facets of the sphere, metalness max 1 (looks most metalic), roughness 0 makes super shiny
        const planetB = new THREE.Mesh(geometryPlanetB, materialPlanetB);

        //creating shadows
        planetB.castShadow = true //sphere is making a shadow
        planetB.receiveShadow = true //sphere can receive shadow

        //add to planetB to planet group
        this.group.add(planetB);


        //create glow effect
        const glowGeometryB = new THREE.SphereGeometry(2, 10, 12);//creates weird red blob around planet, rad can't be bigger than 2 according to prompt
        const glowMaterialB = new THREE.MeshBasicMaterial({
            color: 0x852929,//same color as emissive
            transparent: true,
            opacity: 0.35,
        });
        const planetBglow = new THREE.Mesh(glowGeometryB, glowMaterialB);

        //no shadow on glow effect
        planetBglow.castShadow = false;

        //add glow to planet group
        this.group.add(planetBglow);


        //STEP 2: 
        //TODO: Add from 1 to 3 orbiting moons to the planet group.
        //TODO: The moons should rotate around the planet just like the planet group rotates around the Sun.

        //  // Add corona (particle ring)
        //         const coronaParticles = new THREE.BufferGeometry();
        //         const coronaCount = 200;
        //         const coronaPositions = new Float32Array(coronaCount * 3);
        //         for (let i = 0; i < coronaCount; i++) {
        //             const angle = (i / coronaCount) * Math.PI * 2;
        //             const radius = 3.8 + Math.random() * 0.5;
        //             coronaPositions[i * 3] = Math.cos(angle) * radius;
        //             coronaPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
        //             coronaPositions[i * 3 + 2] = Math.sin(angle) * radius;
        //         }
        //         coronaParticles.setAttribute('position', new THREE.BufferAttribute(coronaPositions, 3));
        //         const coronaMaterial = new THREE.PointsMaterial({ color: 0xffaa33, size: 0.1 });
        //         this.corona = new THREE.Points(coronaParticles, coronaMaterial);
        //         this.corona.castShadow = false;
        //         this.scene.add(this.corona);

        const moonNum = 3//Math.random() * (3 - 2) + 2; //create random num of moons
        this.moons = []; //creates array to store moons


        //creates moons
        for (let i = 0; i < moonNum; i++) {

            const moonGroup = new THREE.Group();//make universal variable for moon group so can access in update

            const geometryMoon = new THREE.SphereGeometry(Math.random() * (0.7 - 0.4) + 0.4, 32, 32);//made rad between 0.4 and 0.7
            const materialMoon = new THREE.MeshStandardMaterial({
                color: 0x3d88b3,
                emissive: 0x852929,
                emissiveIntensity: .5,//default 1
                flatShading: false,
                metalness: .9,
                roughness: .7,
            });//look at mat prop and make more interesting
            const moon = new THREE.Mesh(geometryMoon, materialMoon);

            //shadows, moons can creatd and receive shadows
            moon.castShadow = true;
            moon.receiveShadow = true;

            //offsets moons on different orbitting rings
            const orbitRad = 3 + i * 1.5
            moon.position.x = orbitRad;

            //random start angle, do moon group because rotation relative to planet B
            moonGroup.rotation.y = Math.random() * Math.PI * 2


            //add moon to moon group
            moonGroup.add(moon);

            this.moons.push({ group: moonGroup, speed: 0.2 + Math.random() * 0.8 });

            //add whole moongroup to planet group
            this.group.add(moonGroup);
        };



        //         moonOrbitRadius = orbitRadius;
        //         moonOrbitSpeed = orbitSpeed;
        //         this.angle = Math.random() * Math.PI * 2;


        // }
        // createMoons(moon,10,0.5);
        // this.group.add(moons[i]);


        // //idk if need this
        // this.moonGroup.castShadow = true //sphere is making a shadow
        // this.moonGroup.receiveShadow = true //sphere can receive shadow



        //STEP 3:
        //TODO: Load Blender models to populate the planet with multiple props and critters by adding them to the planet group.
        //TODO: Make sure to rotate the models so they are oriented correctly relative to the surface of the planet.

        //STEP 4:
        //TODO: Use raycasting in the click() method below to detect clicks on the models, and make an animation happen when a model is clicked.
        //TODO: Use your imagination and creativity!

        this.scene.add(this.group);
    }

    update(delta) {
        // Orbit around sun
        this.angle += this.orbitSpeed * delta * 30;
        this.group.position.x = Math.cos(this.angle) * this.orbitRadius;
        this.group.position.z = Math.sin(this.angle) * this.orbitRadius;

        // Rotate planet
        this.group.rotation.y += delta * 0.5;


        //TODO: Do the moon orbits and the model animations here.

        this.moons.forEach(moon => {
            moon.group.rotation.y += delta * moon.speed;
        });
    }

    click(mouse, scene, camera) {
        //TODO: Do the raycasting here.
    }
}

