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
    currentColor: "notOver",
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

    mouseOver();

    drawRectangles(rect1);
    drawRectangles(rect2);
    drawRectangles(rect3);
};

//draws all rectangles
function drawRectangles(rectN) {
    noStroke();

    if (rectN.currentColor === "notOver") {
        fill(rectN.fill.notOver);
    }
    else {
        fill(rectN.fill.over)
    }

    rect(rectN.x, rectN.y, rectN.w, rectN.h);
};


//color change
function mouseOver() {
    //rect 1
    if (0 < mouseX < 200) {
        rect1.currentColor = "over";
        rect2.currentColor = "notOver";
        rect3.currentColor = "notOver";
    }
    //rect 2
    else if (200 < mouseX < 400) {
        rect2.currentColor = "over";
        rect1.currentColor = "notOver";
        rect3.currentColor = "notOver";
    }
    //rect 3
    else if (400 < mouseX < 600) {
        rect3.currentColor = "over";
        rect1.currentColor = "notOver";
        rect2.currentColor = "notOver";
    }

}