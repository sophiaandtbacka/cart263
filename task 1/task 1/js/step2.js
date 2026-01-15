"use strict";

function setup() {
    console.log("go");
    createCanvas(500, 500);
    drawEllipse(200, 40, 30, 50, 120, 50, 70);//ellipse 1
    drawEllipse(100, 300, 70, 30, 10, 80, 250);//ellipse 2
    drawEllipse(400, 250, 45, 45, 90, 120, 200);//ellipse 3
}

function draw() {

}

function drawEllipse(x, y, w, h, r, g, b) {
    noStroke();
    fill(r, g, b);
    ellipse(x, y, w, h);
}