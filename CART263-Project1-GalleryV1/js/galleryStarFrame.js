
//Background gallery stars
class galleryStarFrame {
    constructor(x, y, width, height) {
        //variables given value when calling function
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

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


        // graffiti img layer
        this.graffitiLayer = document.createElement("img");//makes an img element
        this.graffitiLayer.src = "./media/starFrameFill.png";//gives the graffiti img location
        this.graffitiLayer.style.width = "100%";//how wide is your img compared to div
        this.graffitiLayer.style.height = "100%";//how tall is your img compared to div
        this.graffitiLayer.style.objectFit = "contain";//when img scales maintains orginal asset ratios
        this.graffitiLayer.style.position = "absolute";//can put element anywhere on canvas no hierarchy compared to other elements
        this.graffitiLayer.style.left = "0px";
        this.graffitiLayer.style.top = "0px";
        this.graffitiLayer.style.pointerEvents = "none"; // don't block mouse


        // star image
        let starImg = document.createElement("img");
        starImg.src = "./media/starFrame.png";
        starImg.style.width = "100%";
        starImg.style.height = "100%";
        starImg.style.objectFit = "contain";
        starImg.style.position = "absolute"; // Stack it inside the wrapper
        starImg.style.left = "0px";
        starImg.style.top = "0px";



        // Put it all together
        this.body.appendChild(this.graffitiLayer);
        this.body.appendChild(starImg);

        document.querySelector("main").appendChild(this.body);
    }

}
