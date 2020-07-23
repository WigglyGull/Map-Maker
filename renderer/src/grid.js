const mapRows = 16;
const mapColumns = 10;

exports.createGrid = map => {
    if(map === null) return;
    const amountofSqaures = mapRows * mapColumns;

    for (let index = 0; index < amountofSqaures; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        map.appendChild(grid);
    }
}