
window.onload = getLiveVideo;

async function getLiveVideo() {
    console.log("loaded");
    //grabbing vid and canvas from html
    //making the context the canvas
    //?explain context?
    let video = document.getElementById("video");
    let canvas = document.getElementById("videoCanvas");
    let context = canvas.getContext("2d");
    video.style.display = "none"//makes so vid not shown just canvas, you still need the vid src though if you want to do any sort of manipulation


    try {
        let stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: 320,
                height: 240,
            },
        });
        video.srcObject = stream;
        console.log(video.srcObject); //here there is something
        /*** instead of using the video object we can use the canvas **/
        requestAnimationFrame(run);
        function run() {
            context.save();//saves the pixels at moment, like push in p5
            context.clearRect(0, 0, canvas.width, canvas.height);//erases rectangular canvas and sets pizels to a transparent black, will clear inbetween every frame
            //put onto canvas
            //translate to center and scale on x axis - flip ..
            context.translate(canvas.width / 2, 0)
            context.scale(-1, 1)//flipping image
            context.drawImage(video, 0, 0, canvas.width / 2, canvas.height);//when put in video now every frame will update drawImage function
            context.restore()//like pop in p5
            context.fillStyle = "#FFFFFF";

            let frame = context.getImageData(0, 0, canvas.width / 2, canvas.height);//get image date of all of canvas
            // every pixel has an r,g,b,a value ... and so in the array - every 4 values== 1 pixel
            for (let i = 0; i < frame.data.length; i += 4) {
                let r = frame.data[i];
                let g = frame.data[i + 1];
                let b = frame.data[i + 2];
                let a = frame.data[i + 3];
                frame.data[i] = r;
                frame.data[i + 1] = 0;//no b now
                frame.data[i + 2] = 0;//no g now

                // make every 8th pixel have an alpha of 0/
                if (i % 32 == 0) {//don't understand why ==
                    frame.data[i + 3] = 0;
                }

                //every 2nd pixel is full opacity
                if (i % 8 === 0) {
                    frame.data[i + 2] = 255;
                }
            }
            context.putImageData(frame, 0, 0);//putting back new image data to be revealed
            context.restore();

            context.fillRect(10, canvas.height / 2, 50, 50);
            requestAnimationFrame(run);
        }
    } catch (err) {
        /* handle the error */
        console.log("had an error getting the camera");
    }
}
