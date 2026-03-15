
class galleryCircleCursor {
    constructor(x, y, width, height, radius) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.radius = radius;

        this.body = document.createElement("div");

    }

    renderGalleryCircleCursor() {
        this.body.style.position = "fixed";
        // this.outlineLayer.style.zIndex = 100;
        this.body.style.width = this.width + "px";
        this.body.style.height = this.height + "px";

        this.body.style.pointerEvents = "none";
        this.body.style.transform = "translate(-50%, -50%)";//now x and y in center of div

        document.querySelector("main").appendChild(this.body);
    }

    animateGalleryCircleCursor(graffitiLayer) {

        // move the cursor
        this.body.style.left = mouseX + "px";
        this.body.style.top = mouseY + "px";

        // calculate correct mask position
        let rect = graffitiLayer.getBoundingClientRect();

        let localX = mouseX - rect.left;
        let localY = mouseY - rect.top;

        //makes under the cursor the graffiti layer transparent
        graffitiLayer.style.maskImage =
            `radial-gradient(circle ${this.radius}px at ${localX}px ${localY}px,
        transparent 0px,
        transparent ${this.radius}px,
        black ${this.radius + 1}px)`;

        requestAnimationFrame(() =>
            this.animateGalleryCircleCursor(graffitiLayer)
        );
    }
}