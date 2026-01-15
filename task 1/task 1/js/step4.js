"use strict";

let rect1 = {
    x: 0,
    y: 0,
    w: 200,
    h: 600,
    fill: {
        notOver: "lightblue",
        over: "white",
    },
    over: false,
};

let rect2 = {
    x: 200,
    y: 0,
    w: 200,
    h: 600,
    fill: {
        notOver: "blue",
        over: "white",
    },
    currentColor: "notOver",
};

let rect3 = {
    x: 400,
    y: 0,
    w: 200,
    h: 600,
    fill: {
        notOver: "darkblue",
        over: "white",
    },
    currentColor: "notOver",
};


function setup() {
    console.log("go");
    createCanvas(600, 600);

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

    if (mouseX > rectN.x && mouseX < rectN.x + rectN.w && mouseY > rectN.y && mouseY < rectN.h) {
        fill(rectN.fill.over);
    }
    else {
        fill(rectN.fill.notOver)
    }

    rect(rectN.x, rectN.y, rectN.w, rectN.h);
};

