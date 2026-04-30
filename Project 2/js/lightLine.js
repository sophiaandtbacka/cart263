import * as THREE from 'three';
export class Line {
    constructor(scene) {
        this.start = performance.now();

        //make a curved line that goes through these points
        const line = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-50, 0, 50),
            new THREE.Vector3(-5, 5, 5),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(5, -5, 5)

        ])
        //divide curve into points
        const pointNum = 300
        this.samplePoints = line.getSpacedPoints(pointNum);

        this.geometry = new THREE.BufferGeometry().setFromPoints(this.samplePoints);

        const colors = new Float32Array(this.samplePoints.length * 3);//stores rgb per point

        //change color
        this.geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 2,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.points = new THREE.Points(this.geometry, material);
        scene.add(this.points);


    }

    // ------------------
    // Color gradient function
    // ------------------
    getColorAt(t) {
        // smooth rainbow gradient (0 → 1)
        const color = new THREE.Color();
        color.setHSL(t, 1.0, 0.5);
        return color;
    }

    // ------------------
    // Animation
    // ------------------


    update() {


        const now = performance.now();
        const t = ((now - this.start) % 10000) / 10000; // 10 second loop

        const n = this.samplePoints.length;
        const arr = this.geometry.attributes.color.array;

        const center = t * n;  // moving pulse
        const width = 12;      // size of pulse

        for (let i = 0; i < n; i++) {

            // position along curve (0 → 1)
            const u = i / n;

            // get smooth color based on position
            const baseColor = this.getColorAt(u);

            // distance to pulse center (wraps around)
            let d = Math.abs(i - center);
            d = Math.min(d, n - d);

            let intensity = 0;

            if (d < width) {
                const x = d / width;

                // smooth falloff (bright center, soft edges)
                intensity = Math.cos(x * Math.PI * 0.5);

                // optional: sharper center
                intensity = Math.pow(intensity, 2);
            }

            // apply color * intensity
            arr[i * 3 + 0] = baseColor.r * intensity;
            arr[i * 3 + 1] = baseColor.g * intensity;
            arr[i * 3 + 2] = baseColor.b * intensity;
        }

        this.geometry.attributes.color.needsUpdate = true;


    }

}