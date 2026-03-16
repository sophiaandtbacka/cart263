let centerStarFrame;

window.onload = function () {
    let gallery = {
        galleryStars: [], //stars array
        numGalleryStars: 195, //amount of stars generated

        galleryStarFrame: [],//only one created

        galleryCircleCursor: [],//only one created

    };

    //creates star frame
    function createGalleryStarFrame() {
        //creates star frame
        let starFrame = new galleryStarFrame();
        //puts info of created star frame in array
        gallery.galleryStarFrame.push(starFrame);

        // assign global reference for background stars
        centerStarFrame = starFrame;
    }

    //draws star frame on gallery page
    function renderGalleryStarFrame() {
        // renders all stars, set num of stars at top in gallery
        let starFrame = gallery.galleryStarFrame[0];//0 because only one star frame is created
        starFrame.renderGalleryStarFrames();
    }

    //calls all functions for Gallery Star Frame
    createGalleryStarFrame();
    renderGalleryStarFrame();



    function createGalleryCircleCursor() {
        let x = mouseX;
        let y = mouseY;
        let w = 100;
        let h = 100;
        let r = 50;

        let circleCursor = new galleryCircleCursor(x, y, w, h, r);

        gallery.galleryCircleCursor.push(circleCursor);

    }

    function renderGalleryCircleCursor() {
        let circleCursor = gallery.galleryCircleCursor[0];
        let starFrame = gallery.galleryStarFrame[0];

        circleCursor.renderGalleryCircleCursor();
        circleCursor.animateGalleryCircleCursor(starFrame.graffitiLayer);
    }

    createGalleryCircleCursor()
    renderGalleryCircleCursor()

    //creates all of stars on the gallery page background
    function createGalleryStars() {
        //create some stars
        for (let i = 0; i < gallery.numGalleryStars; i++) {
            //defines stars' variables
            let x = Math.random() * window.innerWidth; //random x start position
            let y = Math.random() * window.innerHeight; //random y start position
            let w = Math.floor(Math.random() * 5 + 1) * 20;//makes the stars 20,40,60,80px wide
            let h = Math.floor(Math.random() * 5 + 1) * 20;

            //color of stars
            let tint = `rgb(${18}, ${20}, ${255})`;//does random color change with 100% opacity on mask tint layer

            //creates stars
            let star = new galleryStar(x, y, w, h, tint);

            //puts info of created stars in array
            gallery.galleryStars.push(star);//pushes bee into bees array
        }
    }

    //draws all the stars on the gallery page background
    function renderGalleryStars() {
        // renders all stars, set num of stars at top in gallery
        for (let i = 0; i < gallery.galleryStars.length; i++) {
            let star = gallery.galleryStars[i];
            star.renderGalleryStars();
        }
    }

    //animates all gallery background stars    
    function animateGalleryStars() {
        // animates all stars, all movement in animate in galleryStars.js 
        for (let i = 0; i < gallery.galleryStars.length; i++) {//galleryStars.length is array length
            let star = gallery.galleryStars[i];
            star.animateGalleryStars();
        }
    }



    //calls all functions for Gallery Background Stars
    createGalleryStars();
    renderGalleryStars();
    animateGalleryStars();


    function renderGlow() {
        // create the grid after rendering the star frame
        const grid = new Grid(gallery.galleryStarFrame[0], 14, 30);
    }

    renderGlow();


}