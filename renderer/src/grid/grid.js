const roomItem = require("./room");
const toolItem = require("../tools/tool");
const doors = require("../tools/door");
const icon = require("../tools/icon");
const text = require("../tools/text");
const eraser = require("../tools/eraser");
const keyInputs = require("../meta/keyInputs");

exports.mapRows = 16;
exports.mapColumns = 10;
exports.gridList = [];
exports.undoRedoSystem = undefined;

exports.getUndoRedoSystem = (_undoRedoSystem)=>{
    this.undoRedoSystem = _undoRedoSystem;
}

exports.createGrid = (gridHolder) => {
    if(gridHolder === null) throw "Gridholder not found";
    const amountofSqaures = this.mapRows * this.mapColumns;

    for (let index = 0; index < amountofSqaures; index++) {
        const grid = document.createElement("div");
        grid.classList.add("grid");
        grid.classList.add(`${index}`);
        gridHolder.appendChild(grid);
        
        this.addEvents(grid);
    }
    this.undoRedoSystem.setHistory(gridHolder.cloneNode(true));
}

exports.addEvents = grid =>{
    grid.addEventListener("click", () => {
        const gridHasChild = grid.firstChild !== null;
        if(!gridHasChild && !keyInputs.holdingShift){
            this.spawnRoom(grid);
            this.undoRedoSystem.saveMap();
            if(toolItem.activeTool !== "roomTool") toolItem.setActive(toolItem.tools[0], toolItem.tools);
        }
        if(gridHasChild && keyInputs.holdingShift){
            eraser.removeRoom(grid);
            this.undoRedoSystem.saveMap();
        }
    });
    grid.addEventListener("contextmenu", ()=>{
        if(grid.firstChild === null && !keyInputs.holdingShift){
            this.createNewRoom(grid);
            this.undoRedoSystem.saveMap();
            if(toolItem.activeTool !== "roomTool") toolItem.setActive(toolItem.tools[0], toolItem.tools);
        }
    });
    
    doors.createDoor(grid, this.undoRedoSystem);
    icon.createIcon(grid, this.undoRedoSystem);
    text.createText(grid, this.undoRedoSystem);

    this.gridList = document.querySelectorAll(".grid");
}

//Spawns a connected room
exports.spawnRoom = (grid) => {
    const direction = roomItem.findPos(grid);
    if(roomItem.singleRoom(direction)) this.createNewRoom(grid);
    else roomItem.createRoom(grid);
}

//Spawns a sperate room
exports.createNewRoom = (grid)=>{
    const room = document.createElement("div");
    roomItem.numOfRooms++;
    this.setDefault(room, roomItem.currentRoomColor, roomItem.currentBorderColor, `${roomItem.numOfRooms}`);
    roomItem.currentRoom = room.classList.item(1);
    
    roomItem.setStyle(room);
    grid.appendChild(room);
    room.addEventListener("click", ()=>{
        roomItem.currentRoom = room.classList.item(1);
    
    })
    roomItem.roomList.push(room);
}

exports.setDefault = (room, style, outlineStyle, roomNum) =>{
    room.style = "";
    room.className = "";
    room.style.width = "6.7rem";
    room.style.height = "6.7rem";
    room.style.background = style;
    room.style.zIndex = "2";
    room.style.border = `0.3rem solid ${outlineStyle}`;
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