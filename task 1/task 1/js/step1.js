"use strict";
let ellipses = {
    x: 100,
    y: 200,
    w: 50,
    h: 25,
    fill: {
        r: 50,
        g: 250,
        b: 120,
    }
}

function setup() {
    console.log("go");
    createCanvas(500, 500);

}

function draw() {
    noStroke();

    //ellipse 1
    push();
    fill(ellipses.fill.r, ellipses.fill.g, ellipses.fill.b);
    ellipse(ellipses.x, ellipses.y, ellipses.w, ellipses.h);
    pop();

    //ellipse 2
    push();
    ellipses.fill.r = 30;
    ellipses.fill.g = 30;
    ellipses.fill.b = 30;
    ellipses.x = 30;
    ellipses.y = 30;
    ellipses.w = 30;
    ellipses.h = 30;
    fill(ellipses.fill.r, ellipses.fill.g, ellipses.fill.b);
    ellipse(ellipses.x, ellipses.y, ellipses.w, ellipses.h);
    pop();

    //ellipse 3
    push();
    ellipses.fill.r = 130;
    ellipses.fill.g = 70;
    ellipses.fill.b = 80;
    ellipses.x = 350;
    ellipses.y = 150;
    ellipses.w = 40;
    ellipses.h = 70;
    fill(ellipses.fill.r, ellipses.fill.g, ellipses.fill.b);
    ellipse(ellipses.x, ellipses.y, ellipses.w, ellipses.h);
    pop();

}