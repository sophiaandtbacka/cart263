"use strict";

//check if you are on circle or square, start on circle
let checkCircle = true;

//fill colors
let r = 130;
let g = 200;
let b = 100;


function setup() {
    console.log("go");
    createCanvas(500, 500);
};

function draw() {
    background("black");
    fill(r, g, b);
    drawCirclesOrSquares();
}

//makes circle or square true, helper function
function mouseClicked() {
    if (checkCircle === true) {
        checkCircle = false
    }
    else if (checkCircle === false) {
        checkCircle = true
    }
}

function drawCirclesOrSquares() {

    let size = 10;
    let sizeFactor = 5;
    let finalSize = sizeFactor * size;

    let x = finalSize / 2;
    let y = finalSize / 2;

    if (checkCircle === true) {
        while (y < height) {
            while (x < width) {
                ellipse(x, y, finalSize);
                x += finalSize;
            }
            x = finalSize / 2;
            y += finalSize;
        }
    }

    else if (checkCircle === false) {
        while (y < height) {
            while (x < width) {
                rectMode(CENTER);//makes x and y in center of rectangle like circles
                rect(x, y, finalSize);
                x += finalSize;
            }
            x = finalSize / 2;
            y += finalSize;
        }
    }
}

//color change
function keyPressed(SPACE) {
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
}