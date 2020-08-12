const gridItem = require("./grid.js");

exports.roomList = [];
exports.numOfRooms = 0;

//Sets direction depending if the neighbouring grids have a room
exports.findPos = (grid) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = getNeighbours(grid);

    if(directions.length !== neighbours.length) throw "Hey idoit these values aren't matching!!!!!";
    for (let i = 0; i < directions.length; i++) {
        if(neighbours[i] === undefined) continue;
        if(neighbours[i].firstChild !== null) directions[i] = true;
    }
    return directions;
}

//Joins a room to another room and changes neighbours
exports.createRoom = grid =>{
    fillSqaures();
    const neighbours = getNeighbours(grid);
    const directions = this.findPos(grid);
    const roomString = getClass(directions);
    this.createNewRoom(grid, roomString);
    
    neighbours.forEach(neighbour =>{
        if(neighbour === undefined) return;
        if(neighbour.firstChild !== null) this.changeNeighbour(neighbour);
    });
    fillSqaures();
}

//Spawns a sperate room
exports.createNewRoom = (grid, roomString)=>{
    const room = document.createElement("div");
    if(roomString === ""){
        setStyle(room);
        this.numOfRooms++;
    }else room.classList.add(roomString);
    room.classList.add(`room${this.numOfRooms}`);
    grid.appendChild(room);

    this.roomList.push(room);
    fillSqaures();
    console.log(this.numOfRooms);
}

const setStyle = (room) => {
    room.style.width = "6.7rem";
    room.style.height = "6.7rem";
    room.style.background = "#9F9F9F";
    room.style.zIndex = "2";
    room.style.border = "0.3rem solid #383838";
    room.style.borderRadius = "0.4rem";
}

//Changes class to fit with the new room placement
exports.changeNeighbour = (grid) => {
    const directions = this.findPos(grid);
    const roomString = getClass(directions);
    
    grid.firstChild.style = "";
    grid.firstChild.className = "";
    grid.firstChild.classList.add(roomString);
    grid.firstChild.classList.add(`room${this.numOfRooms}`);
}

//Goes through all the grids changing the class if it makes a sqaure
function fillSqaures(){
    const gridList = gridItem.gridList;
    gridList.forEach(grid =>{
        const index = Number(grid.classList.item(1));
        let rightGrid = gridItem.gridList[index+1];
        if(gridItem.checkRightSide(grid)) rightGrid = undefined;
        const bottomGrid = gridItem.gridList[index + gridItem.mapRows];
        const bottomRightGrid = gridItem.gridList[index + (gridItem.mapRows+1)];

        if(rightGrid !== undefined && bottomGrid !== undefined && bottomRightGrid !== undefined){
            if(grid.firstChild !== null && rightGrid.firstChild !== null && bottomGrid.firstChild !== null && bottomRightGrid.firstChild !== null){
                const roomString = grid.firstChild.classList.item(0);
                switch(roomString){
                    case "room-right-down": resetStyle(grid, roomString, "room-right-down-fill"); break;
                    case "room-left-right-down": resetStyle(grid, roomString, "room-left-right-down-fill"); break;
                    case "room-right-up-down": resetStyle(grid, roomString, "room-right-up-down-fill"); break;    
                    case "room-left-right-up-down": resetStyle(grid, roomString, "room-left-right-up-down-fill"); break;    
                }
            }
        }else return;
    });
}
function resetStyle(grid, roomString, newString){
    grid.style.background = "#9F9F9F";
    grid.firstChild.classList.remove(roomString);
    grid.firstChild.classList.add(newString);
}

//Returns the surrounding grids
function getNeighbours(grid){
    const index = Number(grid.classList.item(1));
    let leftGrid = gridItem.gridList[index-1];
    if(gridItem.checkLeftSide(grid)) leftGrid = undefined;
    let rightGrid = gridItem.gridList[index+1];
    if(gridItem.checkRightSide(grid)) rightGrid = undefined;

    const topGrid = gridItem.gridList[index - gridItem.mapRows];
    const bottomGrid = gridItem.gridList[index + gridItem.mapRows];
    return neighbours = [leftGrid, rightGrid, topGrid, bottomGrid];
}

//Returns a class depending on position
function getClass(directions){
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