window.onload = function () {
    console.log("keys");

    window.setTimeout(function (e) {//set timeout good for if you want something to only run one time
        let parent = document.querySelector("#parent");
        parent.innerHTML += "New text"
    }, 5000);

    window.setInterval(function (e) {//good if you want something to repeat
        let parent = document.querySelector("#parent");
        parent.innerHTML += "New text for interval"
    }, 5000);




    window.addEventListener('keydown', keyHandler);
    window.addEventListener('keydown', keyHandlerUp);

    function keyHandlerUp(event) {
        if (event.code === "ArrowUp") {//have to console log to see if you have to use key or code 
            document.querySelector("#boxB").style.background = "blue"
        }
    }

    let speedX = 5;
    function keyHandler(event) {
        if (event.key === "ArrowRight") {
            document.querySelector("#boxA").style.left =
                parseInt(document.querySelector("#boxA").style.left) + speedX + "px" //need to extract number part of style left because formated as number and string for px or %

        }
        if (event.key === "ArrowLeft") {
            document.querySelector("#boxA").style.left =
                parseInt(document.querySelector("#boxA").style.left) - speedX + "px" //need to extract number part of style left because formated as number and string for px or %


        }
        if (event.code === "Space") {//have to console log to see if you have to use key or code 
            document.querySelector("#boxB").style.background = "orange"
        }
        else {
            console.log(event)
            document.querySelector("#textContainer").textContent += `${event.key}`
        }

    }
}