
//Background gallery stars
class galleryStarFrame {
    constructor() {
        // Makes the div for the center stars
        this.body = document.createElement("div");
    }


    // four levels general div, white background, graffiti fill, star outline
    renderGalleryStars() {
        // Wrapper div
        this.body.classList.add("starFrame");

        // white star background img layer, masks animated background stars, needs to be an img layer b/c otherwise rect div preemptively masks animated stars
        this.backgroundLayer = document.createElement("img");//makes an img element, controled by css .starFrame img
        this.backgroundLayer.src = "./media/starFrameBackground2.png";//gives the white background img location
        //this.backgroundLayer.style.zIndex = 1;

        // graffiti img layer
        this.graffitiLayer = document.createElement("img");//makes an img element, controled by css .starFrame img
        this.graffitiLayer.src = "./media/starFrameFill2.png";//gives the graffiti fill img location
        // this.backgroundLayer.style.zIndex = 2;


        // star outline img layer
        this.outlineLayer = document.createElement("img");//makes an img element, controled by css .starFrame img
        this.outlineLayer.src = "./media/starFrame6.png";//gives the star outline img location
        //this.graffitiLayer.style.zIndex = 3;

        // Put it all together
        this.body.appendChild(this.backgroundLayer);
        this.body.appendChild(this.graffitiLayer);
        this.body.appendChild(this.outlineLayer);

        document.querySelector("main").appendChild(this.body);
    }


}