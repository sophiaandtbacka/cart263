
//Background gallery stars
class galleryStarFrame {
    constructor(x, y, width, height, graffitiOpacity) {
        //variables given value when calling function
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.graffitiOpacity = graffitiOpacity;

        // Make the wrapper div
        this.body = document.createElement("div");
    }



    // Since I uploaded a PNG and we need to modify the color, I'll create a tint layer and mask out the transparent background
    renderGalleryStars() {
        // Wrapper div
        this.body.classList.add("starFrame");
        this.body.style.position = "absolute";
        this.body.style.left = this.x + "px";
        this.body.style.top = this.y + "px";
        this.body.style.transform = "translate(-50%, -50%)";
        this.body.style.width = this.width + "px";
        this.body.style.height = this.height + "px";
        this.body.style.left = this.x + "px";
        this.body.style.top = this.y + "px";

        // star image
        let starImg = document.createElement("img");
        starImg.src = "./media/starFrame.png";
        starImg.style.width = "100%";
        starImg.style.height = "100%";
        starImg.style.objectFit = "contain";
        starImg.style.position = "absolute"; // Stack it inside the wrapper

        // graffiti img layer
        let graffitiLayer = document.createElement("img");
        graffitiLayer.src = "./media/starFrameFill.png";
        graffitiLayer.style.width = "100%";
        graffitiLayer.style.height = "100%";
        graffitiLayer.style.objectFit = "contain";
        graffitiLayer.style.position = "absolute";

        graffitiLayer.style.opacity = this.graffitiOpacity;//make opacity changeable

        // Put it all together
        this.body.appendChild(graffitiLayer);
        this.body.appendChild(starImg);

        document.getElementsByTagName("main")[0].appendChild(this.body);
    }

}
