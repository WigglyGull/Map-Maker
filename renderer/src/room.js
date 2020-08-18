const gridItem = require("./grid.js");
const biome = require("./biome");
const keyInputs = require("./keyInputs"); 

exports.roomList = [];
exports.numOfRooms = 0;
exports.currentRoom = this.numOfRooms;

exports.currentRoomColor = biome.roomGrey;
exports.currentBorderColor = biome.roomDarkGrey;

//Joins a room to another room and changes neighbours
exports.createRoom = grid =>{
    const neighbours = getNeighbours(grid);
    const roomString = getClass(this.findPos(grid, null));
    const room = document.createElement("div");
    room.classList.add(roomString);
    room.classList.add(`${this.currentRoom}`);
    room.style.setProperty("--room", this.currentRoomColor);
    grid.appendChild(room);

    let sameRoom = false;
    let neighbourRooms = [];
    neighbours.forEach((neighbour) =>{
        if(neighbour === undefined || neighbour.firstChild === null) return;
        changeNeighbour(neighbour);
        
        if(neighbour.firstChild.classList.item(1) === grid.firstChild.classList.item(1)) sameRoom = true;
        else if(!neighbourRooms.includes(neighbour.firstChild.classList.item(1))) neighbourRooms.push(neighbour.firstChild.classList.item(1)); 
    });
    if(!sameRoom){
        const room = grid.firstChild;
        const roomString = getClass(this.findPos(grid));
        room.className = "";
        neighbours.forEach(neighbour =>{
            if(neighbour === undefined || neighbour.firstChild === null) return;
            room.classList.add(roomString);
            room.classList.add(neighbour.firstChild.classList.item(1));
            changeNeighbour(neighbour);
        });
        if(neighbourRooms.length >= 2){
            grid.firstChild.remove();
            gridItem.createNewRoom(grid);
            neighbours.forEach(neighbour => {
                if(neighbour === undefined || neighbour.firstChild === null) return;
                changeNeighbour(neighbour);
            });
        }
    }
    gridItem.fillSqaures();
    this.currentRoom = grid.firstChild.classList.item(1);
}

//Sets direction depending if the neighbouring grids have a room
exports.findPos = (grid, isNeighbour) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = getNeighbours(grid);

    if(directions.length !== neighbours.length) throw "Hey idoit these values aren't matching!!!!!";
    for (let i = 0; i < directions.length; i++) {
        if(neighbours[i] !== undefined && neighbours[i].firstChild !== null){
            if(isNeighbour === undefined){
                if(neighbours[i].firstChild !== null) directions[i] = true; 
            }else if(isNeighbour === null){
                const mainRoom = this.currentRoom;
                const neighbourRoom = neighbours[i].firstChild.classList.item(1) === null ? neighbours[i].firstChild.classList.item(0) : neighbours[i].firstChild.classList.item(1);
                if(mainRoom === neighbourRoom) directions[i] = true;
            }else{
                const mainRoom = grid.firstChild.classList.item(1) === null ? grid.firstChild.classList.item(0) : grid.firstChild.classList.item(1);
                const neighbourRoom = neighbours[i].firstChild.classList.item(1) === null ? neighbours[i].firstChild.classList.item(0) : neighbours[i].firstChild.classList.item(1);
                if(mainRoom === neighbourRoom) directions[i] = true;
            }
        }
    }
    return directions;
}

//Changes class to fit with the new room placement
const changeNeighbour = (grid) =>{
    const room = grid.firstChild;
    const roomNum = room.classList.item(1) === null ? room.classList.item(0) : room.classList.item(1);
    const roomString = getClass(this.findPos(grid, true));
    const style = room.style.getPropertyValue("--room");
    
    room.style = "";
    room.className = "";
    room.classList.add(roomString);
    room.classList.add(roomNum);
    room.style.setProperty("--room", style);
}

//Returns the surrounding grids
const getNeighbours = grid=>{
    const index = gridItem.gridIndex(grid);
    const leftGrid = gridItem.checkLeftSide(grid) ? undefined : gridItem.gridList[index-1];
    const rightGrid = gridItem.checkRightSide(grid) ? undefined : gridItem.gridList[index+1];
    const topGrid = gridItem.gridList[index - gridItem.mapRows];
    const bottomGrid = gridItem.gridList[index + gridItem.mapRows];
    return neighbours = [leftGrid, rightGrid, topGrid, bottomGrid];
}

//Returns a class depending on position
const getClass = directions=>{
    let roomString = "";
    const [left, right, up, down] = directions;
    if(up){
        if(down){
            if(right){
                if(left) roomString = "room-left-right-up-down";
                else roomString = "room-right-up-down";
            }else if(left) roomString = "room-left-up-down";
            else roomString = "room-up-down";
        }else{
            if(right){
                if(left) roomString = "room-left-right-up";
                else roomString = "room-right-up";
            }else if(left) roomString = "room-left-up";
            else roomString = "room-up";
        }
        return roomString;
    }
    if(down){
        if(right){
            if(left)roomString = "room-left-right-down";
            else roomString = "room-right-down";
        }else if(left) roomString = "room-left-down";
        else roomString = "room-down";
        return roomString;
    }
    if(right)
        if(left) roomString = "room-left-right";
        else roomString = "room-right";
    else roomString = "room-left";
    return roomString;
}