const roomItem = require("./room");
exports.mapRows = 16;
exports.mapColumns = 10;
exports.gridList = [];

exports.createGrid = gridHolder => {
    if(gridHolder === null) throw "Gridholder not found";

    //Spawns the grid
    const amountofSqaures = this.mapRows * this.mapColumns;
    for (let index = 0; index < amountofSqaures; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add(`${index}`);
        gridHolder.appendChild(grid);
        
        grid.addEventListener("click", ()=>{
            if(grid.firstChild !== null) return;
            const direction = roomItem.findPos(grid);
            if(direction[0] === false && direction[1] === false && direction[2] === false && direction[3] === false) this.createNewRoom(grid);
            else roomItem.createRoom(grid);
        });
        
        grid.addEventListener("contextmenu", ()=>{
            if(grid.firstChild !== null) return;
            this.createNewRoom(grid);
        });
    }
    this.gridList = document.querySelectorAll(".grid");
}

//Spawns a sperate room
exports.createNewRoom = (grid)=>{
    const room = document.createElement("div");
    this.setDefault(room, roomItem.currentRoomColor);
    roomItem.numOfRooms++;
    room.classList.add(`${roomItem.numOfRooms}`);
    roomItem.currentRoom = room.classList.item(0);
    console.log(roomItem.currentRoom);
    
    room.style.setProperty("--room", roomItem.currentRoomColor);
    grid.appendChild(room);
    roomItem.roomList.push(room);
}

exports.setDefault = (room, style) =>{
    room.style = "";
    room.className = "";
    room.style.width = "6.7rem";
    room.style.height = "6.7rem";
    room.style.background = style;
    room.style.zIndex = "2";
    room.style.border = "0.3rem solid #383838";
    room.style.borderRadius = "0.4rem";
}

//Goes through all the grids changing the class if it makes a sqaure
exports.fillSqaures=()=>{
    const gridList = this.gridList;
    gridList.forEach(grid =>{
        const index = Number(grid.classList.item(1));
        const rightGrid = this.checkRightSide(grid) ? undefined : gridList[index+1];
        const bottomGrid = gridList[index + this.mapRows];
        const bottomRightGrid = gridList[index + (this.mapRows+1)];

        if(rightGrid !== undefined && bottomGrid !== undefined && bottomRightGrid !== undefined){
            if(grid.firstChild !== null && rightGrid.firstChild !== null && bottomGrid.firstChild !== null && bottomRightGrid.firstChild !== null){
                const currentRoom = grid.firstChild.classList.item(1);
                if(rightGrid.firstChild.classList.item(1) === currentRoom && bottomGrid.firstChild.classList.item(1) === currentRoom && bottomRightGrid.firstChild.classList.item(1) === currentRoom){
                    const roomString = grid.firstChild.classList.item(0);
                    switch(roomString){
                        case "room-right-down": resetStyle(grid, "room-right-down-fill"); break;
                        case "room-left-right-down": resetStyle(grid, "room-left-right-down-fill"); break;
                        case "room-right-up-down": resetStyle(grid, "room-right-up-down-fill"); break;    
                        case "room-left-right-up-down": resetStyle(grid, "room-left-right-up-down-fill"); break;    
                    }
                }
            }
        }else return;
    });
}
const resetStyle = (grid, newString)=>{
    const roomNum = grid.firstChild.classList.item(1);
    grid.style.background = roomItem.currentRoomColor;
    grid.firstChild.className = "";
    grid.firstChild.classList.add(newString);
    grid.firstChild.classList.add(roomNum);
}

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