import * as THREE from 'three';

export class Line {
    constructor(scene) {
        this.start = performance.now();//stores time start

        //make a curved line that goes through these points
        //random line now, will make a more interesting line maybe like a spiral
        const line = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-50, 0, 50),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, -5, 5)

        ]);

        //divide curve into points
        const pointNum = 300;
        this.samplePoints = line.getSpacedPoints(pointNum);

        // //going to use in future for creating multiple blobs along the line
        // const blobNum = 5;
        // this.blobPoints = line.getSpacedPoints(blobNum);

        //makes all points a geometry
        this.geometry = new THREE.BufferGeometry().setFromPoints(this.samplePoints);

        //create rgb array
        const colors = new Float32Array(this.samplePoints.length * 3);

        //change color, attach colors to points
        this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 5.5,
            vertexColors: true,//makes it so each point can have a diff color
            transparent: true,// allows for blending
            blending: THREE.AdditiveBlending,//colors add instead of replace, makes it so line isn't visible
            depthWrite: false,//makes the whole point colored not just the edge
        });

        this.points = new THREE.Points(this.geometry, material);
        scene.add(this.points);


    }

    //created the color gradient
    getColorAt(t) {
        // smooth rainbow gradient (0 → 1)
        const color = new THREE.Color();
        color.setHSL(t, 1.0, 0.5);
        return color;
    }


    update() {

        const now = performance.now();
        const t = ((now - this.start) % 10000) / 10000; // 10 second loop

        const n = this.samplePoints.length;
        const arr = this.geometry.attributes.color.array;

        const center = t * n;  // moving pulse
        const width = 12;      // size of pulse

        for (let i = 0; i < n; i++) {

            // position along curve 0-1, based on which point you're at
            const u = i / n;

            // get smooth color based on position
            const baseColor = this.getColorAt(u);

            // distance to pulse center 
            let d = Math.abs(i - center);
            d = Math.min(d, n - d);

            let intensity = 0;//makes line not visible

            if (d < width) {
                const x = d / width;

                // smooth falloff (bright center, soft edges)
                intensity = Math.cos(x * Math.PI * .5);

                // supposed to make sharper center, not working
                intensity = Math.pow(intensity, 5);
            }


            //mapping rainbow along line, might change this so that specifics sections have a specific color
            // apply color * intensity
            arr[i * 3 + 0] = baseColor.r * intensity;
            arr[i * 3 + 1] = baseColor.g * intensity;
            arr[i * 3 + 2] = baseColor.b * intensity;
        }

        this.geometry.attributes.color.needsUpdate = true;


    }

}