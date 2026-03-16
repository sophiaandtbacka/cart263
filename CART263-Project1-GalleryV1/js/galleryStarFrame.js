
//Background gallery stars
class galleryStarFrame {
    constructor() {
        // Makes the div for the center stars
        this.body = document.createElement("div");
    }


    // four levels general div, white background, graffiti fill, star outline
    renderGalleryStarFrames() {
        // Wrapper div, holds all the layers
        this.body.classList.add("starFrame");

        // white star background img layer, masks animated background stars, needs to be an img layer b/c otherwise rect div preemptively masks animated stars
        this.backgroundLayer = document.createElement("img");//makes an img element, controled by css .starFrame img
        this.backgroundLayer.src = "./media/starFrameBackground2.png";//gives the white background img location
        //this.backgroundLayer.style.zIndex = 1;


        //img grid on top of white background
        this.imageGrid = document.createElement("div");//makes grid div

        this.imageGrid.style.position = "absolute";//allows for layering not relative positioning
        this.imageGrid.style.width = "100%";
        this.imageGrid.style.height = "100%";

        this.imageGrid.style.display = "grid";//turns into a grid
        this.imageGrid.style.gridTemplateColumns = "repeat(4, 1fr)";//4x4 grid, 16 imgs
        this.imageGrid.style.gridTemplateRows = "repeat(4, 1fr)";//4x4 grid, 16 imgs

        this.imageGrid.style.maskImage = "url('./media/starFrameBackground2.png')";
        this.imageGrid.style.maskSize = "100% 100%";//masks whole grid
        this.imageGrid.style.maskRepeat = "no-repeat";//no tiling

        //couldn't get this to work
        /*
        // Define your images and their positions
        const images = [
            { src: "./media/background_imgs/kat1.2.png", col: 1, row: 1, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/kat1.png", col: 2, row: 1, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/sophie1.png", col: 3, row: 1, url: "https://www.instagram.com/allofmysharpedges/" },
            { src: "./media/background_imgs/sophie2.png", col: 4, row: 1, url: "https://www.instagram.com/allofmysharpedges/" },

            { src: "./media/background_imgs/sophie3.png", col: 1, row: 2, url: "https://www.instagram.com/allofmysharpedges/" },
            { src: "./media/background_imgs/kat2.png", col: 2, row: 2, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/kat2.2.png", col: 3, row: 2, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/sophie4.png", col: 4, row: 2, url: "https://www.instagram.com/allofmysharpedges/" },

            { src: "./media/background_imgs/kat3.png", col: 1, row: 3, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/kat3.2.png", col: 2, row: 3, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/sophie5.png", col: 3, row: 3, url: "https://www.instagram.com/allofmysharpedges/" },
            { src: "./media/background_imgs/sophie6.png", col: 4, row: 3, url: "https://www.instagram.com/allofmysharpedges/" },

            { src: "./media/background_imgs/kat4.png", col: 1, row: 4, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/kat4.2.png", col: 2, row: 4, url: "https://www.instagram.com/how.2disintegrate/" },
            { src: "./media/background_imgs/sophie7.png", col: 3, row: 4, url: "https://www.instagram.com/allofmysharpedges/" },
            { src: "./media/background_imgs/sophie8.png", col: 4, row: 4, url: "https://www.instagram.com/allofmysharpedges/" }
        ];

        // Loop through and create each image + link
        images.forEach(({ src, col, row, url }) => {
            const link = document.createElement("a");
            link.href = url;
            link.style.display = "block";
            link.style.gridColumn = col;
            link.style.gridRow = row;

            const img = document.createElement("img");
            img.src = src;
            img.style.width = "100%";
            img.style.height = "100%";
            img.style.objectFit = "fill";

            link.appendChild(img);
            this.imageGrid.appendChild(link);
        });
        */


        // create a tag links, can't reuse a tag this way, in future will create a function to do this and reduce redundancies
        const linkKat1 = document.createElement("a");
        linkKat1.href = "https://www.instagram.com/how.2disintegrate/";

        const linkKat2 = document.createElement("a");
        linkKat2.href = "https://www.instagram.com/how.2disintegrate/";

        const linkKat3 = document.createElement("a");
        linkKat3.href = "https://www.instagram.com/how.2disintegrate/";

        const linkKat4 = document.createElement("a");
        linkKat4.href = "https://www.instagram.com/how.2disintegrate/";

        const linkKat5 = document.createElement("a");
        linkKat5.href = "https://www.instagram.com/how.2disintegrate/";

        const linkKat6 = document.createElement("a");
        linkKat6.href = "https://www.instagram.com/how.2disintegrate/";

        const linkKat7 = document.createElement("a");
        linkKat7.href = "https://www.instagram.com/how.2disintegrate/";

        const linkKat8 = document.createElement("a");
        linkKat8.href = "https://www.instagram.com/how.2disintegrate/";


        const linkSophie1 = document.createElement("a");
        linkSophie1.href = "https://www.instagram.com/allofmysharpedges/";

        const linkSophie2 = document.createElement("a");
        linkSophie2.href = "https://www.instagram.com/allofmysharpedges/";

        const linkSophie3 = document.createElement("a");
        linkSophie3.href = "https://www.instagram.com/allofmysharpedges/";

        const linkSophie4 = document.createElement("a");
        linkSophie4.href = "https://www.instagram.com/allofmysharpedges/";

        const linkSophie5 = document.createElement("a");
        linkSophie5.href = "https://www.instagram.com/allofmysharpedges/";

        const linkSophie6 = document.createElement("a");
        linkSophie6.href = "https://www.instagram.com/allofmysharpedges/";

        const linkSophie7 = document.createElement("a");
        linkSophie7.href = "https://www.instagram.com/allofmysharpedges/";

        const linkSophie8 = document.createElement("a");
        linkSophie8.href = "https://www.instagram.com/allofmysharpedges/";


        //img1 in grid, kat 1.2
        const img1 = document.createElement("img");
        img1.src = "./media/background_imgs/kat1.2.png";

        img1.style.width = "100%";
        img1.style.height = "100%";
        img1.style.objectFit = "fill";
        img1.style.gridColumn = "1";
        img1.style.gridRow = "1";

        // append img inside the link
        linkKat1.appendChild(img1);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat1);


        //img2 in grid, kat 1
        const img2 = document.createElement("img");
        img2.src = "./media/background_imgs/kat1.png";

        img2.style.width = "100%";
        img2.style.height = "100%";
        img2.style.objectFit = "fill";
        img2.style.gridColumn = "2";
        img2.style.gridRow = "1";

        // append img inside the link
        linkKat2.appendChild(img2);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat2);


        //img3 in grid, sophie 1
        const img3 = document.createElement("img");
        img3.src = "./media/background_imgs/sophie1.png";

        img3.style.width = "100%";
        img3.style.height = "100%";
        img3.style.objectFit = "fill";
        img3.style.gridColumn = "3";
        img3.style.gridRow = "1";

        // append img inside the link
        linkSophie1.appendChild(img3);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie1);


        //img4 in grid, sophie 2
        const img4 = document.createElement("img");
        img4.src = "./media/background_imgs/sophie2.png";

        img4.style.width = "100%";
        img4.style.height = "100%";
        img4.style.objectFit = "fill";
        img4.style.gridColumn = "4";
        img4.style.gridRow = "1";

        // append img inside the link
        linkSophie2.appendChild(img4);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie2);


        //img5 in grid, sophie 3
        const img5 = document.createElement("img");
        img5.src = "./media/background_imgs/sophie3.png";

        img5.style.width = "100%";
        img5.style.height = "100%";
        img5.style.objectFit = "fill";
        img5.style.gridColumn = "1";
        img5.style.gridRow = "2";

        // append img inside the link
        linkSophie3.appendChild(img5);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie3);

        //img6 in grid, kat
        const img6 = document.createElement("img");
        img6.src = "./media/background_imgs/kat2.png";

        img6.style.width = "100%";
        img6.style.height = "100%";
        img6.style.objectFit = "fill";
        img6.style.gridColumn = "2";
        img6.style.gridRow = "2";

        // append img inside the link
        linkKat3.appendChild(img6);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat3);

        //img7 in grid, kat
        const img7 = document.createElement("img");
        img7.src = "./media/background_imgs/kat2.2.png";

        img7.style.width = "100%";
        img7.style.height = "100%";
        img7.style.objectFit = "fill";

        img7.style.gridColumn = "3";
        img7.style.gridRow = "2";

        // append img inside the link
        linkKat4.appendChild(img7);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat4);


        //img8 in grid, sophie 4
        const img8 = document.createElement("img");
        img8.src = "./media/background_imgs/sophie4.png";

        img8.style.width = "100%";
        img8.style.height = "100%";
        img8.style.objectFit = "fill";
        img8.style.gridColumn = "4";
        img8.style.gridRow = "2";

        // append img inside the link
        linkSophie4.appendChild(img8);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie4);


        //img9 in grid, kat
        const img9 = document.createElement("img");
        img9.src = "./media/background_imgs/kat3.png";

        img9.style.width = "100%";
        img9.style.height = "100%";
        img9.style.objectFit = "fill";
        img9.style.gridColumn = "1";
        img9.style.gridRow = "3";

        // append img inside the link
        linkKat5.appendChild(img9);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat5);

        //img10 in grid, kat
        const img10 = document.createElement("img");
        img10.src = "./media/background_imgs/kat3.2.png";

        img10.style.width = "100%";
        img10.style.height = "100%";
        img10.style.objectFit = "fill";
        img10.style.gridColumn = "2";
        img10.style.gridRow = "3";

        // append img inside the link
        linkKat6.appendChild(img10);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat6);

        //img11 in grid, sophie 5
        const img11 = document.createElement("img");
        img11.src = "./media/background_imgs/sophie5.png";

        img11.style.width = "100%";
        img11.style.height = "100%";
        img11.style.objectFit = "fill";
        img11.style.gridColumn = "3";
        img11.style.gridRow = "3";

        // append img inside the link
        linkSophie5.appendChild(img11);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie5);


        //img12 in grid, sophie 7
        const img12 = document.createElement("img");
        img12.src = "./media/background_imgs/sophie7.png";

        img12.style.width = "100%";
        img12.style.height = "100%";
        img12.style.objectFit = "fill";
        img12.style.gridColumn = "4";
        img12.style.gridRow = "3";

        // append img inside the link
        linkSophie6.appendChild(img12);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie6);


        //img 13 in grid, kat
        const img13 = document.createElement("img");
        img13.src = "./media/background_imgs/kat4.png";

        img13.style.width = "100%";
        img13.style.height = "100%";
        img13.style.objectFit = "fill";
        img13.style.gridColumn = "1";
        img13.style.gridRow = "4";

        // append img inside the link
        linkKat7.appendChild(img13);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat7);


        //img 14 in grid, kat
        const img14 = document.createElement("img");
        img14.src = "./media/background_imgs/kat4.2.png";

        img14.style.width = "100%";
        img14.style.height = "100%";
        img14.style.objectFit = "fill";
        img14.style.gridColumn = "2";
        img14.style.gridRow = "4";

        // append img inside the link
        linkKat8.appendChild(img14);
        // append the link to your grid
        this.imageGrid.appendChild(linkKat8);


        //img 15 in grid, sophie
        const img15 = document.createElement("img");
        img15.src = "./media/background_imgs/sophie6.png";

        img15.style.width = "100%";
        img15.style.height = "100%";
        img15.style.objectFit = "fill";
        img15.style.gridColumn = "3";
        img15.style.gridRow = "4";

        // append img inside the link
        linkSophie7.appendChild(img15);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie7);


        //img 16 in grid, sophie
        const img16 = document.createElement("img");
        img16.src = "./media/background_imgs/sophie8.png";

        img16.style.width = "100%";
        img16.style.height = "100%";
        img16.style.objectFit = "fill";
        img16.style.gridColumn = "4";
        img16.style.gridRow = "4";

        // append img inside the link
        linkSophie8.appendChild(img16);
        // append the link to your grid
        this.imageGrid.appendChild(linkSophie8);



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
        this.body.appendChild(this.imageGrid);
        this.body.appendChild(this.graffitiLayer);
        this.body.appendChild(this.outlineLayer);

        document.querySelector("main").appendChild(this.body);
    }


}