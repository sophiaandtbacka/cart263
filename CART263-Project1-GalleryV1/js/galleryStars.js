//Tracking Mouse Movement
//Need to put here b/c this is the first doc that loads in the html
let mouseX = 0;
let mouseY = 0;
document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});


//Background gallery stars
class galleryStar {
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



    // Uploaded a PNG and create a tint layer to modify the color
    renderGalleryStars() {
        // Wrapper div
        this.body.classList.add("star");
        this.body.style.position = "absolute";
        this.body.style.width = this.width + "px";
        this.body.style.height = this.height + "px";
        this.body.style.left = this.x + "px";
        this.body.style.top = this.y + "px";
        this.body.style.zIndex = "1"; //stars are arranged in background now

        // star image
        let starImg = document.createElement("img");//creates star img div
        starImg.src = "./media/star.png";//star img route
        starImg.style.width = "100%";//img fills the entire div container
        starImg.style.height = "100%";//img fills the entire div container
        starImg.style.objectFit = "contain";//maintains aspect ratio of original img asset
        starImg.style.position = "absolute"; // Stack it on top the wrapper

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

        // Blend the tint and star original color
        tintLayer.style.mixBlendMode = "multiply";

        // Put it all together
        this.body.appendChild(starImg);
        this.body.appendChild(tintLayer);
        document.getElementsByTagName("main")[0].appendChild(this.body);
    }

    animateGalleryStars() {
        //velocitiy for stars, only x change right now
        if (centerStarFrame) {
            let rect = centerStarFrame.body.getBoundingClientRect();

            //area over center star frame
            let mouseOverStar =
                mouseX > rect.left &&
                mouseX < rect.right &&
                mouseY > rect.top &&
                mouseY < rect.bottom;

            if (mouseOverStar) {//stops background star animation when mouse over center star frame
                this.vx = 0;
                //hideNavbar();
            }
            else {//starts background star animation when mouse not over center star frame
                this.vx = Math.random() * 1.1 + 0.1;
                //showNavbar();
            }
        }

        //updates x position with velocity
        this.x += this.vx;

        //update div position with animation
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