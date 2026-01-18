"use strict";

const testText = {
    str: "test",
    x: 300,
    y: 300,
    size: 24,
}

//number constants
const numbers = {
    x: 50,
    y: 150,
}

numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

function setup() {
    console.log("go");
    createCanvas(600, 600);
};

function draw() {
    background("black");

    fill("white");
    textSize(testText.size);

    text(testText.str, 300, 300);

    //horizontal numbers
    for (let i = 0; i < 10; i++) {
        text([i], numbers.x + 20 * i, numbers.y);

    }
    //verticle numbers
    for (let i = 1; i < 16; i++) {
        text([i], numbers.x, numbers.y + 25 * i);

    }
}