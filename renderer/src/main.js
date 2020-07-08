const mapX = 0;
const mapY = 0;

function createGrid(){
    const map = document.querySelector(".map");
    if(map === null) return;
    for (let index = 0; index < 135; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        map.appendChild(grid);
    }
}
createGrid();