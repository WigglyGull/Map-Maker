const room = require("./room");
exports.mapRows = 16;
exports.mapColumns = 10;
exports.gridList = [];

exports.createGrid = gridHolder => {
    if(gridHolder === null){
        console.error("GridHolder not found");
        return;
    }

    //Spawns the grid
    const amountofSqaures = this.mapRows * this.mapColumns;
    for (let index = 0; index < amountofSqaures; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add(`${index}`);
        gridHolder.appendChild(grid);
        
        grid.addEventListener("click", ()=>{
            room.createNewRoom(grid, "room");
        });
        grid.addEventListener("contextmenu", ()=>{
            const direction = room.findPos(grid);
            if(direction[0] === false && direction[1] === false && direction[2] === false && direction[3] === false) room.createNewRoom(grid, "room");
            else room.createRoom(grid, direction);
        });
    }
    this.gridList = document.querySelectorAll(".grid");
}