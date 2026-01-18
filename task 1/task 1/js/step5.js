"use strict";


let counter = {
    value: 0,
}

//orange square
const square = {
    x: 150,
    y: 150,
    w: 50,
    h: 50,
    color: {
        highlighted: {
            r: 255,
            g: 191,
            b: 0,
        },
        notHighlighted: {
            r: 242,
            g: 140,
            b: 40,
        }
    },
    over: false,
}

//circle constant values
const circle = {
    x: 300,
    y: 300,
    color: {//left in rgb format incase want to change color in the future
        r: 255,
        g: 255,
        b: 255,
    }
}

let overlap;//mouse over square variable

function setup() {
    console.log("go");
    createCanvas(600, 600);
};

function draw() {
    background("black");

    checkCollisionWithSquare();
    displaySquare();
    drawCircles();

}

//draws orange square, controls color change
function displaySquare() {
    noStroke();
    if (overlap === true) {
        fill(square.color.highlighted.r, square.color.highlighted.g, square.color.highlighted.b);
    }
    else {
        fill(square.color.notHighlighted.r, square.color.notHighlighted.g, square.color.notHighlighted.b);
    }
    rect(square.x, square.y, square.w, square.h);
}

//if click square then counter goes up
function mousePressed() {
    // Check if the click was inside the square
    if (overlap === true) {
        counter.value++;
        console.log(counter.value);
    }
}

//checks if mouse over square
function checkCollisionWithSquare() {
    if (mouseX >= square.x && mouseX <= square.x + square.w && mouseY >= square.y && mouseY <= square.y + square.h) {
        overlap = true;
    }
    else {
        overlap = false;
    };
}

//draws individual circles
function drawCircle(ellipseRadius, ellipseAlpha) {
    fill(circle.color.r, circle.color.g, circle.color.b, ellipseAlpha);
    ellipse(circle.x, circle.y, ellipseRadius);
}

//draws all circles
function drawCircles() {
    if (counter.value < 10 && counter.value > 1) {
        let ellipseRadius = 75;
        let ellipseAlpha = 0;
        let i = 0;

        while (i < counter.value) {
            drawCircle(ellipseRadius, ellipseAlpha);
            ellipseRadius += 25;
            ellipseAlpha += 10;
            i++;
        }
    }
}