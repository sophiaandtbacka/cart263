
class Flower {
    //function to create a flower in thne future
    constructor(x, y, size, stemLength, petalColor) {//this is a method not function, basically a function within an object
        // We write instructions to set up a Flower here, java script originally wasn't suppose to be used this was but use this as an add on for object oriented programming, this for event listener or this in this case
        // Need to use this because is belongs to this flower
        // Position and size information
        this.x = x;
        this.y = y;
        this.size = size;
        this.stemLength = stemLength;
        this.stemThickness = 10;
        this.petalThickness = 8;
        this.flowerStemDiv = document.createElement("div");
        this.flowerPetalDiv = document.createElement("div");

        // Color information
        this.stemColor = {
            r: 50,
            g: 150,
            b: 50,
        };
        this.petalColor = petalColor;
        this.centreColor = {
            r: 50,
            g: 0,
            b: 0,
        };

        let self = this;//saving data of flower in variable self

        //add event listener and the call back in constructor
        this.flowerStemDiv.addEventListener("click", growStem);
        function growStem(e) {//if you run this it will now refer to growStem so why you need self variable
            console.log("clicked");
            console.log(self);
            //this is the div :)
            //console.log(self);
            self.stemLength = self.stemLength + 10;

            //update the actual div...
            self.flowerStemDiv.style.height = self.stemLength + "px";
            self.flowerStemDiv.style.top = self.y - self.stemLength + "px";

            // and also the petal element needs to move up
            self.flowerPetalDiv.style.top =
                self.y - self.stemLength - self.size / 2 + "px";
        }

    }


    //render method
    //if don't use THIS won't know where to find the variable
    //prefer not to use let in this approach
    renderFlower() {
        this.flowerStemDiv.classList.add("flower");
        this.flowerStemDiv.style.width = this.stemThickness + "px";
        this.flowerStemDiv.style.height = this.stemLength + "px";
        this.flowerStemDiv.style.background = `rgb(
    ${this.stemColor.r},
    ${this.stemColor.g},
    ${this.stemColor.b}
    )`;
        this.flowerStemDiv.style.left = this.x + "px";
        this.flowerStemDiv.style.top = this.y - this.stemLength + "px";
        //add to the DOM
        document.getElementsByClassName("grass")[0].appendChild(this.flowerStemDiv);

        this.flowerPetalDiv.classList.add("petal");
        this.flowerPetalDiv.style.width = this.size + "px";
        this.flowerPetalDiv.style.height = this.size + "px";
        this.flowerPetalDiv.style.borderRadius = this.size + "px";
        this.flowerPetalDiv.style.background = `rgb(
        ${this.centreColor.r},
        ${this.centreColor.g},
        ${this.centreColor.b}
        )`;
        this.flowerPetalDiv.style.left = (this.x - this.size / 2) + "px";
        this.flowerPetalDiv.style.top = (this.y - this.stemLength - this.size / 2) + "px";
        this.flowerPetalDiv.style.borderWidth = this.petalThickness + "px";
        this.flowerPetalDiv.style.borderColor = `rgb(
        ${this.petalColor.r},
        ${this.petalColor.g},
        ${this.petalColor.b}
        )`;
        //add to the DOM
        document.getElementsByClassName("grass")[0].appendChild(this.flowerPetalDiv);
    }
}
