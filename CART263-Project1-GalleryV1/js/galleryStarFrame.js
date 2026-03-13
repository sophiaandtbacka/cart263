
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

        // Tinted overlay, for color change if you want to use it 
        let graffitiLayer = document.createElement("div");
        graffitiLayer.style.width = "100%";
        graffitiLayer.style.height = "100%";
        graffitiLayer.style.position = "absolute"; // Stack exactly on top of the image

        // Apply the color from the constructor parameter
        graffitiLayer.style.backgroundColor = this.graffitiOpacity;

        // Mask out the background so that only the star is colored
        graffitiLayer.style.maskImage = "url('./media/starFrameFill.png')";
        graffitiLayer.style.maskSize = "contain";
        graffitiLayer.style.maskRepeat = "no-repeat";//masks it so there isn't multiple masks
        graffitiLayer.style.maskPosition = "center";//centers the mask over the image

        // Blend the tint and star colors
        graffitiLayer.style.mixBlendMode = "multiply";

        // Put it all together
        this.body.appendChild(starImg);
        this.body.appendChild(graffitiLayer);
        document.getElementsByTagName("main")[0].appendChild(this.body);
    }

}
