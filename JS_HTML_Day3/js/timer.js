
let shades = [
    "#7fb3d5", //grey blue first
    "#76d7c4",
    "#f7dc6f",
    "#eb984e",
    "#cb4335",
    "#8e44ad",
    "#2e4053",
    "#e5e7e9",
];


window.onload = function () {
    //console.log("timers running");
    // for (let i = 0; i < 24; i++) {
    //     //for each x - make a column of changing y's
    //     for (let j = 0; j < 24; j++) {
    //         //create a grid cell with a div
    //         let parent = document.getElementById("parent");
    //         let d = document.createElement("div");
    //         d.classList.add("grid-cell");
    //         parent.appendChild(d);

    //         d.style.left = (i + 1) * 25 + "px";
    //         d.style.top = (j + 1) * 25 + "px";
    //     }
    // }

    // let gridCells = document.querySelectorAll(".grid-cell");

    // let divisor = 2

    // for (let i = 0; i < gridCells.length; i++) {
    //     if (i % divisor === 0) {//checks remainder
    //         gridCells[i].style.background = shades[0]
    //     }
    //     else {
    //         gridCells[i].style.background = shades[1]
    //     }


    //     if (i % 24 === 0) {//alt to this method could make a variable so more generalized or make a 2D array which has packets of information
    //         if (currentShadeIndex === 0) {
    //             currentShadeIndex = 1;
    //         }
    //         else {
    //             currentShadeIndex = 0;
    //         }

    //     }
    //     gridCells[i].style.background = shades[currentShadeIndex]
    // }


    // let changingNum = 0;
    // setInterval(animate_cells_mod_rows, 200);


    // function animate_cells_mod_rows() {
    //     console.log(changingNum);
    //     drawGrid();
    //     changingNum += 1;

    //     if (changingNum === 8) {
    //         changingNum = 0;
    //     }
    // }




    // /* draw the grid */
    // function drawGrid() {
    //     for (let index = 0; index < gridCells.length; index++) {

    //         //check what the remainder is ...
    //         if (index % changingNum === 0) {
    //             gridCells[index].style.background = shades[0];
    //         }
    //         else if (index % changingNum === 1) {
    //             gridCells[index].style.background = shades[1];
    //         }
    //         else if (index % changingNum === 2) {
    //             gridCells[index].style.background = shades[2];
    //         }
    //         else if (index % changingNum === 3) {
    //             gridCells[index].style.background = shades[3];
    //         }
    //         else if (index % changingNum === 4) {
    //             gridCells[index].style.background = shades[4];
    //         }
    //         else if (index % changingNum === 5) {
    //             gridCells[index].style.background = shades[5];
    //         }
    //         else if (index % changingNum === 6) {
    //             gridCells[index].style.background = shades[6];
    //         }
    //         else if (index % changingNum === 7) {
    //             gridCells[index].style.background = shades[7];
    //         }

    //     }
    // }
    // /* hmmm : we could just remove the if /else and write:
    //  gridCells[index].style.background = shades[index%changingNum];
    //  */

    //let dynamicdelay = 500;

    // window.setInterval(function (e) {
    //     let sp = document.createElement("span");
    //     sp.textContent = "adding Text ";
    //     document.querySelector("#parent").appendChild(sp)
    //     dynamicdelay -= 100
    //     console.log(dynamicdelay)
    // }, dynamicdelay)


    // window.setTimeout(
    //     changingTimeout, dynamicdelay
    // )


    // function changingTimeout() {
    //     let sp = document.createElement("span");
    //     sp.textContent = "adding Text ";
    //     document.querySelector("#parent").appendChild(sp)
    //     dynamicdelay -= 10
    //     console.log(dynamicdelay)
    //     window.setTimeout(changingTimeout, dynamicdelay)//don't put setInterval here cuz then will crash and burn cuz too quick
    // }


    //animate a moving particle

    //create a particle div
    let particleDiv = document.createElement("div");
    particleDiv.id = "particle";
    document.querySelector("#parent").appendChild(particleDiv);
    particleDiv.style.left = "25px";
    particleDiv.style.top = "25px";

    window.requestAnimationFrame(animate);//for most smooth animation, set by browser

    let speedX = 2;
    let speedY = 3;
    window.requestAnimationFrame(animate);

    function animate() {
        let p = document.getElementById("particle");
        p.style.left = parseInt(p.style.left) + speedX + "px";
        p.style.top = parseInt(p.style.top) + speedY + "px";
        window.requestAnimationFrame(animate);//makes it loop
        checkBounds(document.getElementById("parent"), p);

    }

    function checkBounds(parent, p) {
        let bounds = parent.getBoundingClientRect();//getbound whatever given to you by DOM library

        if (parseInt(p.style.left) > bounds.right) {//parseInt like p5 get number
            speedX *= -1;//switch polarity

        } else if (parseInt(p.style.left) < bounds.left) {
            speedX *= -1;
        }

        if (parseInt(p.style.top) > bounds.bottom) {
            speedY *= -1;

        } else if (parseInt(p.style.top) < bounds.top) {
            speedY *= -1;
        }
    }


}