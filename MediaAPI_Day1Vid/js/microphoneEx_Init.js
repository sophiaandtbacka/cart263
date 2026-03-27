

window.onload = getMicrophoneInput;

async function getMicrophoneInput() {//async b/c we have await for mic permission
    console.log("here we are ");

    // get the canvas
    let canvas = document.getElementById("drawingCanvas");
    //get the context
    let context = canvas.getContext("2d");

    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    let audioContext = new AudioContext(); //using the web audio library
    try {
        //returns a MediaStreamAudioSourceNode.
        let audioStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
        });
        // console.log(audioStream)
        //pass the microphone input to the web audio API
        let microphoneIn = audioContext.createMediaStreamSource(audioStream);
        console.log(microphoneIn);


        const filter = audioContext.createBiquadFilter();//will only allow a certian decible range
        const analyser = audioContext.createAnalyser();
        // microphone -> filter ->  analyzer->destination
        microphoneIn.connect(filter);
        //use the analyzer object to get some properties ....
        filter.connect(analyser);



        visualizeTimeAndFreq();
        function visualizeTimeAndFreq() {
            const WIDTH = 500;
            const HEIGHT = 500;

            analyser.fftSize = 32; // fft conversion from time to frequency samples, in multiples of 8 how wide the spectrum is
            //console.log (analyser.frequencyBinCount) //half of fft size
            const bufferLength = analyser.fftSize;
            const dataArrayFreq = new Uint8Array(bufferLength); //array

            let drawVisual = requestAnimationFrame(animateVisual);
            function animateVisual() {

                //clear with each frame
                context.fillStyle = "rgb(0 0 0)";
                context.fillRect(0, 0, WIDTH, HEIGHT);

                analyser.getByteFrequencyData(dataArrayFreq);



                //each respective frequency goes in its own bin
                //lowest to highest frequency domain

                /* looking for dominant frequencies*/
                /* higher bars === more dominant frequency  (db)*/

                //each bin represents a given frequency
                //get only the first
                // for (let i = 0; i < 1; i++) {
                //     //frequency value in that bin (more dominant will be higher)
                //     console.log(dataArrayFreq[i]);
                // }


                //each bin represents a given frequency
                //get only the first
                // const barWidth = (WIDTH / bufferLength) * 5;
                // let barHeight;
                // let x2 = 0;
                // for (let i = 0; i < bufferLength; i++) {
                //     //frequency value in that bin (more dominant will be higher)
                //     console.log(dataArrayFreq[i]);
                //     //frequency value in that bin (more dominant will be higher)
                //     barHeight = dataArrayFreq[i];
                //     context.fillStyle = `rgb(${barHeight + 100} 50 50)`;
                //     context.fillRect(x2, HEIGHT - barHeight, barWidth, barHeight);
                //     x2 += barWidth + 1;
                // }


                let average = 0;
                let sum = 0;

                for (let i = 0; i < dataArrayFreq.length; i++) {
                    sum += dataArrayFreq[i];
                }
                average = sum / dataArrayFreq.length;
                console.log(average);


                context.fillStyle = "#FF0000";
                //use the average frequency
                context.fillRect(canvas.width / 2, canvas.height / 2, average, 30);


                drawVisual = requestAnimationFrame(animateVisual);
            }
        }


    }
    catch (err) {
        /* handle the error */
        console.log("had an error getting the microphone");
    }
} 
