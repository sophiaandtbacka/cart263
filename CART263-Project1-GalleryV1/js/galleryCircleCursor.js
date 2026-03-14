
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

        this.body.classList.add("circleCursor");

        this.body.style.position = "fixed";
        this.body.style.width = this.width + "px";
        this.body.style.height = this.height + "px";

        this.body.style.border = "2px solid white";
        this.body.style.borderRadius = "100%";

        this.body.style.pointerEvents = "none";
        this.body.style.transform = "translate(-50%, -50%)";

        document.querySelector("main").appendChild(this.body);
    }

    animateGalleryCircleCursor(graffitiLayer) {

        // move the cursor outline
        this.body.style.left = mouseX + "px";
        this.body.style.top = mouseY + "px";

        // calculate correct mask position
        let rect = graffitiLayer.getBoundingClientRect();

        let localX = mouseX - rect.left;
        let localY = mouseY - rect.top;

        graffitiLayer.style.maskImage =
            `radial-gradient(circle ${this.radius}px at ${localX}px ${localY}px,
        transparent 0px,
        transparent ${this.radius}px,
        black ${this.radius + 1}px)`;

        graffitiLayer.style.webkitMaskImage =
            `radial-gradient(circle ${this.radius}px at ${localX}px ${localY}px,
        transparent 0px,
        transparent ${this.radius}px,
        black ${this.radius + 1}px)`;

        requestAnimationFrame(() =>
            this.animateGalleryCircleCursor(graffitiLayer)
        );
    }
}