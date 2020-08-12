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
            if(grid.firstChild !== null) return;
            const direction = room.findPos(grid);
            if(direction[0] === false && direction[1] === false && direction[2] === false && direction[3] === false) room.createNewRoom(grid, "");
            else room.createRoom(grid);
        });
        
        grid.addEventListener("contextmenu", ()=>{
            if(grid.firstChild !== null) return;
            room.createNewRoom(grid, "");
        });
    }
    this.gridList = document.querySelectorAll(".grid");
}

//This is dymanic see i am a good programmer
exports.checkLeftSide = grid => {
    let index = this.gridIndex(grid);
    for (let i = 0; i < this.mapColumns+1; i++) {
        if(index === this.mapRows*i) return true;
    }
    return false;
}
exports.checkRightSide = grid => {
    let index = this.gridIndex(grid);
    for (let i = 1; i < this.mapColumns+1; i++) {
        if(index === ((this.mapRows-1)*i)+(i-1)) return true;
    }
    return false;
}
exports.gridIndex = grid => {
    return Number(grid.classList.item(1));
}