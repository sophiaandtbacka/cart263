

document.write("<h2>HELLO WORLD DYNAMIC</h2>");

console.log("Hello World in the console");


window.onload = setup
function setup() {
    console.log("running setup");
    document.write("HELLO WORLD AFTER LOAD IN FUNCTION");
}
