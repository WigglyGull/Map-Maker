const gridItem = require("./grid.js");
const biome = require("./biome");
const keyInputs = require("./keyInputs"); 

exports.roomList = [];
exports.numOfRooms = 0;
exports.currentRoom = this.numOfRooms;

exports.currentRoomColor = biome.roomGrey;
exports.currentBorderColor = biome.roomDarkGrey;

//Bug: changing neighbours is broken some where

//Joins a room to another room and changes neighbours
exports.createRoom = grid =>{
    const neighbours = getNeighbours(grid);
    const roomString = getClass(this.findPos(grid, null));
    const _room = document.createElement("div");
    _room.classList.add(roomString);
    _room.classList.add(`${this.currentRoom}`);
    _room.style.setProperty("--room", this.currentRoomColor);
    _room.style.setProperty("--roomBorder", this.currentBorderColor);
    grid.appendChild(_room);

    let sameRoom = false;
    let diffrentStyle = false;
    let neighbourRooms = [];
    let neighbourStyles = [];
    let neighbourStylesAll = [];

    const room = grid.firstChild;
    const roomStyle = room.style.getPropertyValue("--room");
    neighbours.forEach((neighbour) =>{
        if(neighbour === undefined || neighbour.firstChild === null) return;
        changeNeighbour(neighbour);

        const neighbourStyle = neighbour.firstChild.style.getPropertyValue("--room");
        neighbourStylesAll.push(neighbourStyle);

        if(neighbour.firstChild.classList.item(1) === room.classList.item(1)){
            sameRoom = true;
            if(roomStyle !== neighbourStyle) diffrentStyle = true;
        }else if(!neighbourRooms.includes(neighbour.firstChild.classList.item(1))) neighbourRooms.push(neighbour.firstChild.classList.item(1)); 
    });
    if(!sameRoom){
        const roomString = getClass(this.findPos(grid));
        room.className = "";
        neighbours.forEach(neighbour =>{
            if(neighbour === undefined || neighbour.firstChild === null) return;
            room.classList.add(roomString);
            room.classList.add(neighbour.firstChild.classList.item(1));
            changeNeighbour(neighbour);

            const neighbourStyle = neighbour.firstChild.style.getPropertyValue("--room");
            if(roomStyle !== neighbourStyle) diffrentStyle = true;
            if(!neighbourStyles.includes(neighbourStyle)) neighbourStyles.push(neighbourStyle);
        });
        if(neighbourRooms.length >= 2) createNewRoom(neighbours, grid); 
    }
    if(diffrentStyle){
        let twoOrMore = false;
        if(getOccurrence(neighbourStylesAll, roomStyle) >= 2) twoOrMore = true;

        if(neighbourStyles.length >= 2 && twoOrMore ===  false){
            const roomString = getClass(this.findPos(grid, true, true));
            
            room.style = "";
            room.className = "";
            room.classList.add(roomString);
            room.style.setProperty("--room", roomStyle);
            neighbours.forEach(neighbour => {
                if(neighbour === undefined || neighbour.firstChild === null) return;
                changeNeighbour(neighbour, true);
                if(roomStyle === neighbour.firstChild.style.getPropertyValue("--room"))room.classList.add(neighbour.firstChild.classList.item(1));
            });
        }else createNewRoom(neighbours, grid);
    }
    
    gridItem.fillSqaures();
    this.currentRoom = room.classList.item(1) === null ? room.classList.item(0) : room.classList.item(1);
}

//Sets direction depending if the neighbouring grids have a room
exports.findPos = (grid, isNeighbour) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = getNeighbours(grid);

    if(directions.length !== neighbours.length) throw "Hey idoit these values aren't matching!!!!!";
    for (let i = 0; i < directions.length; i++) {
        if(neighbours[i] !== undefined && neighbours[i].firstChild !== null){
            const neighbourRoom = neighbours[i].firstChild.classList.item(1) === null ? neighbours[i].firstChild.classList.item(0) : neighbours[i].firstChild.classList.item(1);
            let mainRoom = undefined;
            
            if(isNeighbour === undefined && neighbours[i].firstChild !== null) directions[i] = true; 
            else if(isNeighbour === null) mainRoom = this.currentRoom;
            else mainRoom = grid.firstChild.classList.item(1) === null ? grid.firstChild.classList.item(0) : grid.firstChild.classList.item(1);
            
            if(mainRoom !== undefined && mainRoom === neighbourRoom) directions[i] = true;
        }
    }
    return directions;
}

exports.findPosByStyle = (grid, isNeighbour) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = getNeighbours(grid);

    if(directions.length !== neighbours.length) throw "Hey idoit these values aren't matching!!!!!";
    for (let i = 0; i < directions.length; i++) {
        if(neighbours[i] !== undefined && neighbours[i].firstChild !== null){
            const roomStyle = grid.firstChild.style.getPropertyValue("--room");
            const neighbourStyle = neighbours[i].firstChild.style.getPropertyValue("--room");
            if(roomStyle === neighbourStyle) directions[i] = true;
        }
    }
    return directions;
}

const getOccurrence = (array, value) =>{
    var count = 0;
    array.forEach((v) => (v === value && count++));
    return count;
}

//Changes class to fit with the new room placement
const changeNeighbour = (grid, byStyle) =>{
    const room = grid.firstChild;
    const roomNum = room.classList.item(1) === null ? room.classList.item(0) : room.classList.item(1);
    const roomString = byStyle === undefined ? getClass(this.findPos(grid, true)) : getClass(this.findPosByStyle(grid));
    const style = room.style.getPropertyValue("--room");
    
    room.style = "";
    room.className = "";
    room.classList.add(roomString);
    room.classList.add(roomNum);
    room.style.setProperty("--room", style);
}

const createNewRoom = (neighbours, grid)=>{
    grid.firstChild.remove();
    gridItem.createNewRoom(grid);
    neighbours.forEach(neighbour => {
        if(neighbour === undefined || neighbour.firstChild === null) return;
        changeNeighbour(neighbour);
    });
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