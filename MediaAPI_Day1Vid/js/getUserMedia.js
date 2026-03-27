
window.onload = getLiveVideo;

async function getLiveVideo() {//have to have async if you have an await statement
    console.log("loaded");
    let video = document.getElementById("video");//call vid element from html
    console.log(video.srcObject);//log the vid src

    try {//try clause
        let stream = await navigator.mediaDevices.getUserMedia({//ask permission for camera to be used, await means don't run code until camera is streaming,
            //video: {},//non specific video

            video: {//specific video quality/size
                width: 320,
                height: 240,
            },

        });
        video.srcObject = stream;//the video src is the live camera stream
        console.log(video.srcObject) //here there is something
    } catch (err) {//when say no to camera permission
        /* handle the error */
        console.log("had an error getting the camera");
    }
}

//if you use the live capture stream as vid src you can't apply any filters or do any distortions
//have to have a precaptured video that animate frame by frame then you can distort pixels