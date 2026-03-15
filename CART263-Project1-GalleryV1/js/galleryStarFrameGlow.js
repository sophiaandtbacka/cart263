
// GRID CELL
class GridCell {
    constructor(parent, size = 20) {
        this.size = size;
        this.body = document.createElement("div");
        this.body.classList.add("gridCell");
        this.body.style.width = this.size + "px";
        this.body.style.height = this.size + "px";
        this.body.style.backgroundColor = "white";
        this.body.style.margin = "0"; // no gaps
        this.body.style.boxSizing = "border-box";

        // append to parent container
        parent.appendChild(this.body);
    }

    updateEffect(mouseX, mouseY, maxDistance = 150) {
        const rect = this.body.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = mouseX - centerX;
        const dy = mouseY - centerY;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);

        const t = Math.max(0, Math.min(1, (maxDistance - distance) / maxDistance));

        // box-shadow glow from white to blue
        const glowIntensity = t * 15; // max 15px
        const color = `rgba(0, 0, 255, ${t})`;
        this.body.style.boxShadow = `0 0 ${glowIntensity}px ${color}`;

        // optional: also interpolate background
        const r = 255 - t * 255;
        const g = 255 - t * 255;
        const b = 255;
        this.body.style.backgroundColor = `rgb(${r},${g},${b})`;
    }
}

// GRID MANAGER
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
        this.cells.forEach(cell => cell.updateEffect(mouseX, mouseY, 150));
        requestAnimationFrame(() => this.animate());
    }
}