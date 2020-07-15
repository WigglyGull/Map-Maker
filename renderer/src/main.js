const map = document.querySelector(".map");
const mapRows = 16;
const mapColumns = 9;

createGrid();

function createGrid(){
    if(map === null) return;
    const amountofSqaures = mapRows * mapColumns;

    for (let index = 0; index < amountofSqaures; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        map.appendChild(grid);
    }
}
