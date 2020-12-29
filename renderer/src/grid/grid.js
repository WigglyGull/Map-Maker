const roomItem = require("./room");
const toolItem = require("../tools/tool");
const biomeItem = require("../tools/biome");
const doors = require("../tools/door");
const icon = require("../tools/icon");
const text = require("../tools/text");
const eraser = require("../tools/eraser");
const keyInputs = require("../meta/keyInputs");

const globalData = require("../../../src/globalData.js");
const darkMode = globalData.darkMode;

exports.activeBorderColour = darkMode ? "white" : "black";
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

    //Creates the grid
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
    //Spawns a conjoining room 
    grid.addEventListener("click", () => {
        const gridHasChild = grid.firstChild !== null;
        if(!gridHasChild && !keyInputs.holdingShift){
            this.spawnRoom(grid);
            this.undoRedoSystem.saveMap();
            if(toolItem.activeTool !== "roomTool") toolItem.setActive(toolItem.tools[0], toolItem.tools);
        }
        //Removes room
        if(gridHasChild && keyInputs.holdingShift){
            eraser.removeRoom(grid);
            this.undoRedoSystem.saveMap();
        }
    });

    //Spawns a new room
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
    this.setDefault(room, roomItem.currentRoomColor, `${roomItem.numOfRooms}`);
    roomItem.currentRoom = room.classList.item(1);
    
    roomItem.setStyle(room);
    grid.appendChild(room);
    this.setCurrentRoomEvent(room);
    roomItem.roomList.push(room);
}

exports.setCurrentRoomEvent = (room)=>{
    roomItem.currentRoom = room.classList.item(1);
    roomItem.roomList.forEach(room =>{
        if(roomItem.currentRoom !== room.classList.item(1)) this.setRoomColoursBack(room);
    });

    //Sets clicked room to be active
    room.addEventListener("click", ()=>{
        this.setCurrentRoom(room);
    });
}
exports.setCurrentRoom = (room)=>{
    roomItem.currentRoom = room.classList.item(1);
    roomItem.roomList.forEach(_room =>{
        //sets the current room to have a black outline 
        if(roomItem.currentRoom === _room.classList.item(1)){
            _room.style.setProperty("--roomBorder", this.activeBorderColour);
            if(_room.parentElement === null) return;
            const roomDoors = doors.getDoors(_room.parentElement);
            roomDoors.forEach(door=>{
                const roomColour = _room.style.getPropertyValue("--roomBorder");
                door.style.setProperty("--background", roomColour);
            });
        }
        if(roomItem.currentRoom !== _room.classList.item(1)) this.setRoomColoursBack(_room);
    });
    
}

//Sets all the rooms back to the default colour
exports.setRoomColoursBack = (room)=>{
    biomeItem.setDefaultBorder(room);
    if(room.parentElement === null) return;
    const roomDoors = doors.getDoors(room.parentElement);

    //loops through each room setting the outline depending on what the rooms colour is
    roomDoors.forEach(door=>{
        const roomColour = room.style.getPropertyValue("--roomBorder");
        door.style.setProperty("--background", roomColour);
    });
}

//sets the style for a default room
exports.setDefault = (room, style, roomNum) =>{
    room.style = "";
    room.className = "";
    room.style.width = "6.7rem";
    room.style.height = "6.7rem";
    room.style.background = style;
    room.style.zIndex = "2";
    room.style.border = `0.3rem solid var(--roomBorder)`;
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
exports.getRoom = (room) => {
    let fullRoom = [];
    this.gridList.forEach((listRoom)=>{
        if(listRoom.firstChild === null) return;
        const roomNum = listRoom.firstChild.classList.item(1);
        const currentRoomNum = room.classList.item(1);
        if(currentRoomNum === roomNum) fullRoom.push(listRoom.firstChild);
    });
    return fullRoom;
}
exports.getDarkMode =()=>{
    
}