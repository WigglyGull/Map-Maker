const mapRows = 16;
const mapColumns = 10;

exports.gridList = [];

exports.createGrid = gridHolder => {
    if(gridHolder === null){
        console.error("GridHolder not found");
        return;
    }

    //Spawns the grid
    const amountofSqaures = mapRows * mapColumns;
    for (let index = 0; index < amountofSqaures; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add(`${index}`);
        gridHolder.appendChild(grid);
        
        grid.addEventListener("click", ()=>{
            createRoom(grid);
        });
        grid.addEventListener("contextmenu", ()=>{
            addRoom(grid);
        });
    }
    this.gridList = document.querySelectorAll(".grid");
}

function createRoom(grid){
    const room = document.createElement("div");
    room.classList.add("room");
    grid.appendChild(room);
}

function addRoom(grid){
    createRoom(grid);
}