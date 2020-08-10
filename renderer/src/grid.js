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

        if(index === 85){
            const room = document.createElement("div");
            room.classList.add("room-left-right-up-down");
            grid.appendChild(room);
        }
        
        grid.addEventListener("click", ()=>{
            if(grid.firstChild !== null) return;
            room.createNewRoom(grid, "room");
        });
        grid.addEventListener("contextmenu", ()=>{
            if(grid.firstChild !== null) return;
            const direction = room.findPos(grid);
            if(direction[0] === false && direction[1] === false && direction[2] === false && direction[3] === false) room.createNewRoom(grid);
            else room.createRoom(grid);
        });
    }
    this.gridList = document.querySelectorAll(".grid");
}