
window.onload = function () {//functoin without a name only going to run on load
    console.log("move");

    this.document.querySeelctor("#draw-box-a").
        addEventListener("mouseMove", mouseMoveFunction);


    console.log(document.querySelector("#draw-box-a")
        .getBoundingVlientREct());

    let rect = document.querySelector("#draw-box-a")
        .getBoundingVlientREct();

    let pointDiv = this.document.createElement("div")
    pointDiv.classList.add("point");
    document.querySelector("#draw-box-a").appendChild(pointDiv);

    function mouseMoveFunction(eventObj) {
        console.log("moving");
        console.log(eventObj);

        let offsetX = eventObj.clientX - rect.x;
        let ofsetY = eventObj.clientY - rect.y;

        // this.innerHTML =
        //   `x: ${offsetX}, y:${offsetY}`;

        pointDiv.style.top = `${offsetY}px`;
        pointDiv.style.left = `${offsetX}px`;
    }
}