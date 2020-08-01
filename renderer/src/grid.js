const mapRows = 16;
const mapColumns = 10;

exports.gridList = [];

exports.createGrid = gridHolder => {
    if(gridHolder === null) return;
    const amountofSqaures = mapRows * mapColumns;
    const halfAmount = amountofSqaures/2 + 8;

    //Spawns the grid
    for (let index = 0; index < amountofSqaures; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add(`${index}`);
        
        if(halfAmount === index){
            grid.classList.add("check");
        }
        gridHolder.appendChild(grid);
    }

    //Adds interactity
    this.gridList = document.querySelectorAll(".grid");
    this.gridList.forEach(grid => {
        grid.addEventListener("click", ()=>{
            console.log("help for the love of all that is holy");
        });
    });
}

function createRoom(grid){
    const room = document.createElement("div");
    room.classList.add("room");
    grid.appendChild(room);
}