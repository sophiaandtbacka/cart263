
//Background gallery stars
class galleryStarFrame {
    constructor() {

        // Make the wrapper div
        this.body = document.createElement("div");

    }



    // Since I uploaded a PNG and we need to modify the color, I'll create a tint layer and mask out the transparent background
    renderGalleryStars() {
        // Wrapper div
        this.body.classList.add("starFrame");

        // white star background layer, masks animated star
        this.backgroundLayer = document.createElement("img");//makes an img element, controled by css .starFrame img
        this.backgroundLayer.src = "./media/starFrameBackground.png";//gives the white background img location

        // graffiti img layer
        this.graffitiLayer = document.createElement("img");//makes an img element, controled by css .starFrame img
        this.graffitiLayer.src = "./media/starFrameFill.png";//gives the graffiti fill img location

        // star image
        this.outlineLayer = document.createElement("img");//makes an img element, controled by css .starFrame img
        this.outlineLayer.src = "./media/starFrame.png";//gives the star outline img location

        // Put it all together
        this.body.appendChild(this.backgroundLayer);
        this.body.appendChild(this.graffitiLayer);
        this.body.appendChild(this.outlineLayer);

        document.querySelector("main").appendChild(this.body);
    }


}
