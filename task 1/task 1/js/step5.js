"use strict";
//started didn't finish


let counter = {
    value: 0,
}

const square = {
    x: 150,
    y: 150,
    w: 50,
    h: 50,
    color: {
        r: 150,
        g: 230,
        b: 70,
    },
}

let ellipse = {
    x: 300,
    y: 300,
    s: 300,
}

function setup() {
    console.log("go");
    createCanvas(600, 600);

};

function draw() {

    displaySquare();

}

//draws square
function displaySquare() {
    noStroke();
    fill(square.color.r, square.color.g, square.color.b);
    rect(square.x, square.y, square.w, square.h);
}

//if click square then counter
function mousePressed() {
    // Check if the click was inside the square
    const d = dist(mouseX, mouseY, square.x, square.y);
    const overlap = (d < square.w / 2);

    if (overlap) {
        counter.value++;
        console.log(counter.value);
    }
}

function checkCollisionWithSquare() {
    const d = dist(mouseX, mouseY, square.x, square.y);

    if (d < square.w / 2) {
        overlap = true;
    }
    else {
        overlap = false;
    };
}

function drawEllipse() {
    ellipse(ellipse.x, ellipse.y, ellipse.s);
}