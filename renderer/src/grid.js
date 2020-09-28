const roomItem = require("./room");
const toolItem = require("./tool");
const doors = require("./door");
const icon = require("./icon");
const text = require("./text");

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
        
        grid.addEventListener("click", () => this.spawnRoom(grid));
        grid.addEventListener("contextmenu", ()=>{
            if(checkSpawnable(grid) || toolItem.activeTool !== "roomTool") return;
            this.createNewRoom(grid);
        });

        doors.createDoor(grid);
        icon.createIcon(grid);
        text.createText(grid);
    }
    this.gridList = document.querySelectorAll(".grid");
}

exports.spawnRoom = (grid) => {
    if(checkSpawnable(grid)) return;

    const direction = roomItem.findPos(grid);
    if(roomItem.singleRoom(direction)) this.createNewRoom(grid);
    else roomItem.createRoom(grid);
}

//Spawns a sperate room
exports.createNewRoom = (grid)=>{
    const room = document.createElement("div");
    roomItem.numOfRooms++;
    this.setDefault(room, roomItem.currentRoomColor, `${roomItem.numOfRooms}`);
    roomItem.currentRoom = room.classList.item(1);
    
    roomItem.setStyle(room);
    grid.appendChild(room);
    roomItem.roomList.push(room);
}

const checkSpawnable = (grid)=>{
    if(grid.firstChild !== null) return true;
    if(toolItem.activeTool !== "roomTool") toolItem.setActive(toolItem.tools[0], toolItem.tools);
}

exports.setDefault = (room, style, roomNum) =>{
    room.style = "";
    room.className = "";
    room.style.width = "6.7rem";
    room.style.height = "6.7rem";
    room.style.background = style;
    room.style.zIndex = "2";
    room.style.border = "0.3rem solid #383838";
    room.style.borderRadius = "0.6rem";
    room.style.position = "absolute"
    room.classList.add("single");
    room.classList.add(roomNum);
}

exports.getNeighbours = grid=>{
    const gridList = this.gridList;
    const index = this.gridIndex(grid);
    const leftGrid = this.checkLeftSide(grid) ? undefined : gridList[index-1];
    const rightGrid = this.checkRightSide(grid) ? undefined : gridList[index+1];
    const topGrid = gridList[index - this.mapRows];
    const bottomGrid = gridList[index + this.mapRows];
    return neighbours = [leftGrid, rightGrid, topGrid, bottomGrid];
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
exports.getRoom = room => {
    let fullRoom = [];
    this.gridList.forEach((listRoom)=>{
        if(listRoom.firstChild === null) return;
        const roomNum = listRoom.firstChild.classList.item(1);
        const currentRoomNum = room.classList.item(1);
        if(currentRoomNum === roomNum) fullRoom.push(listRoom.firstChild);
    });
    return fullRoom;
}