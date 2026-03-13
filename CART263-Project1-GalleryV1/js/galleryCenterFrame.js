//Tracking Mouse Movement
let mouseX = 0;
document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
});

//Background gallery stars
class galleryCenterFrame {
    constructor(x, y, width, height, tintColor) {
        //variables given value when calling function
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tintColor = tintColor;
        this.vx = this.vx;

        // Make the wrapper div
        this.body = document.createElement("div");
    }



    // Since I uploaded a PNG and we need to modify the color, I'll create a tint layer and mask out the transparent background
    renderGalleryStars() {
        // Wrapper div
        this.body.classList.add("star");
        this.body.style.position = "absolute";
        this.body.style.width = this.width + "px";
        this.body.style.height = this.height + "px";
        this.body.style.left = this.x + "px";
        this.body.style.top = this.y + "px";

        // star image
        let starImg = document.createElement("img");
        starImg.src = "./media/star.png";
        starImg.style.width = "100%";
        starImg.style.height = "100%";
        starImg.style.objectFit = "contain";
        starImg.style.position = "absolute"; // Stack it inside the wrapper

        // Tinted overlay, for color change if you want to use it 
        let tintLayer = document.createElement("div");
        tintLayer.style.width = "100%";
        tintLayer.style.height = "100%";
        tintLayer.style.position = "absolute"; // Stack exactly on top of the image

        // Apply the color from the constructor parameter
        tintLayer.style.backgroundColor = this.tintColor;

        // Mask out the background so that only the star is colored
        tintLayer.style.maskImage = "url('./media/star.png')";
        tintLayer.style.maskSize = "contain";
        tintLayer.style.maskRepeat = "no-repeat";//masks it so there isn't multiple masks
        tintLayer.style.maskPosition = "center";//centers the mask over the image

        // Blend the tint and star colors
        tintLayer.style.mixBlendMode = "multiply";

        // Put it all together
        this.body.appendChild(starImg);
        this.body.appendChild(tintLayer);
        document.getElementsByTagName("main")[0].appendChild(this.body);
    }

    animateGalleryStars() {
        //velocitiy for stars, only x change right now
        if (mouseX < 350 || mouseX > (window.innerWidth - 350)) {
            this.vx = Math.random() * 1.1 + 0.1;
        }
        else { this.vx = 0; }

        //updates x position with velocity
        this.x += this.vx;

        //update div position
        this.body.style.left = this.x + "px";
        this.body.style.top = this.y + "px";

        // reset stars when they go off screen
        if (this.x > window.innerWidth) {
            this.x = -this.width;
        }

        //callback so it keeps animating
        window.requestAnimationFrame(() => this.animateGalleryStars());
    }
}
