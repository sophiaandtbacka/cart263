"use strict";

let rect1 = {
    x: 100,
    y: 200,
    w: 50,
    h: 25,
    fill: {
        r: 50,
        g: 250,
        b: 120,
    }
};

let rect2 = {
    x: 200,
    y: 250,
    w: 150,
    h: 25,
    fill: {
        r: 110,
        g: 60,
        b: 200,
    }
};

let rect3 = {
    x: 350,
    y: 300,
    w: 70,
    h: 45,
    fill: {
        r: 150,
        g: 20,
        b: 110,
    }
};


function setup() {
    console.log("go");
    createCanvas(500, 500);

};

function draw() {
    background("white");

    drawRectangles(rect1);
    drawRectangles(rect2);
    drawRectangles(rect3);

};

//draws all rectangles
function drawRectangles(rectN) {
    noStroke();
    fill(rectN.fill.r, rectN.fill.g, rectN.fill.b);
    rect(rectN.x, rectN.y, rectN.w, rectN.h);
};

//moves rectangle 1
function mouseClicked() {
    rect1.x = random(0 + rect1.w, width - rect1.w);
    rect1.y = random(0, height);
}

//moves rectangle 2
function keyPressed(SPACE) {
    rect2.x = random(0 + rect2.w, width - rect2.w);
    rect2.y = random(0 + rect2.h, width - rect2.h);
}

//moves rectangle 3
function mouseMoved() {
    rect3.fill.r = random(0, 255);
    rect3.fill.g = random(0, 255);
    rect3.fill.b = random(0, 255);

}