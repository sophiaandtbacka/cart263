//Everything to do with glow effect

//deals with individual cells
class GridCell {
    constructor(parent, size = 5) {//default is cell size 5, parent is the container which is the gallery star frame div
        this.size = size;//cell size

        this.body = document.createElement("div");//div created
        this.body.classList.add("gridCell");//connects to gridCell css

        this.body.style.width = this.size + "px";//makes square cells, width and height same
        this.body.style.height = this.size + "px";//makes square cells, width and height same
        this.body.style.backgroundColor = "white";

        // append to parent container, which is starFrame
        parent.appendChild(this.body);
    }

    updateEffect(centerX, centerY, maxDistance = 150) {
        const rect = this.body.getBoundingClientRect();

        const cellX = rect.left + rect.width / 2;
        const cellY = rect.top + rect.height / 2;

        const dx = centerX - cellX;
        const dy = centerY - cellY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        //intensity quotien
        const t = Math.max(0, Math.min(1, (maxDistance - distance) / maxDistance));

        //box-shadow glow from white to blue
        const glowIntensity = t * 1; // max 15px
        const color = `rgba(0, 0, 255, ${t})`;
        this.body.style.boxShadow = `0 0 ${glowIntensity}px ${color}`;

        //interpolate background
        const r = 255 - t * 255;
        const g = 255 - t * 255;
        const b = 255;
        this.body.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
}

// deals with grid organization
class Grid {
    constructor(centerStarFrame, cellSize = 20, margin = 30) {
        this.cells = [];
        this.cellSize = cellSize;

        // get centerStarFrame dimensions
        const rect = centerStarFrame.body.getBoundingClientRect();
        this.startX = rect.left - margin;
        this.startY = rect.top - margin;
        this.width = rect.width + margin * 2;
        this.height = rect.height + margin * 2;

        // compute star center
        this.centerX = rect.left + rect.width / 2;
        this.centerY = rect.top + rect.height / 2;

        // create container div
        this.container = document.createElement("div");
        this.container.style.position = "absolute";
        this.container.style.left = `${this.startX}px`;
        this.container.style.top = `${this.startY}px`;
        this.container.style.width = `${this.width}px`;
        this.container.style.height = `${this.height}px`;

        // use CSS grid
        this.container.style.display = "grid";
        this.container.style.gridTemplateColumns = `repeat(${Math.floor(this.width / this.cellSize)}, ${this.cellSize}px)`;
        this.container.style.gridTemplateRows = `repeat(${Math.floor(this.height / this.cellSize)}, ${this.cellSize}px)`;
        this.container.style.gap = "0px"; // no gaps
        document.body.appendChild(this.container);

        // create cells
        const rows = Math.floor(this.height / this.cellSize);
        const cols = Math.floor(this.width / this.cellSize);
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const cell = new GridCell(this.container, this.cellSize);
                this.cells.push(cell);
            }
        }

        this.animate();
    }

    animate() {
        // get the starFrame rectangle
        const rect = centerStarFrame.body.getBoundingClientRect();

        // check if mouse is inside the starFrame
        const mouseInsideStarFrame =
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom;

        if (mouseInsideStarFrame) {
            // run the glow effect
            this.cells.forEach(cell => cell.updateEffect(mouseX, mouseY, 350));
        } else {
            // reset cells when mouse leaves the starFrame
            this.cells.forEach(cell => {
                cell.body.style.backgroundColor = "white";
                cell.body.style.boxShadow = "none";
            });
        }

        requestAnimationFrame(() => this.animate());
    }
}