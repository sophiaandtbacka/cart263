window.onload = function () {
    let gallery = {
        galleryStars: [], //stars array
        numGalleryStars: 35, //amount of stars generated

        galleryStarFrame: [],

    };

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
            // let tint = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;//does random color change with 100% opacity on mask tint layer
            let tint = `rgb(${255}, ${255}, ${255})`;//makes stars white

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



    function createGalleryStarFrame() {
        //create star frame

        //defines stars' variables
        let x = window.innerWidth / 2;
        let y = window.innerHeight / 2;
        let w = 500;
        let h = 500;

        //color of stars
        let graffitiOpacity = 1;//makes full opacity

        //creates stars
        let starFrame = new galleryStarFrame(x, y, w, h, graffitiOpacity);

        //puts info of created stars in array
        gallery.galleryStarFrame.push(starFrame);//pushes bee into bees array

    }

    //draws all the stars on the gallery page background
    function renderGalleryStarFrame() {
        // renders all stars, set num of stars at top in gallery

        let starFrame = gallery.galleryStarFrame[0];
        starFrame.renderGalleryStars();

    }

    //calls all functions for Gallery Star Frame
    createGalleryStarFrame();
    renderGalleryStarFrame();

}