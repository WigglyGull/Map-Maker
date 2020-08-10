const gridItem = require("./grid.js");

exports.roomList = [];

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

exports.createRoom = grid =>{
    const neighbours = getNeighbours(grid);
    const directions = this.findPos(grid);
    const roomString = getClass(directions);
    this.createNewRoom(grid, roomString);
    
    neighbours.forEach(neighbour =>{
        if(neighbour === undefined) return;
        if(neighbour.firstChild !== null) this.changeNeighbour(neighbour);
    });
}

exports.createNewRoom = (grid, roomString)=>{
    const room = document.createElement("div");
    room.classList.add(roomString);
    grid.appendChild(room);
    this.roomList.push(room);
    console.log();
}

exports.changeNeighbour = (grid) => {
    const directions = this.findPos(grid);
    const roomString = getClass(directions);
    grid.firstChild.classList.remove(grid.firstChild.classList.item(0));
    grid.firstChild.classList.add(roomString);
}

exports.fillSqaures = () => {
    const gridList = gridItem.gridList;
    gridList.forEach(grid =>{
        const index = Number(grid.classList.item(1));
        rightGrid = gridList[index + 1]
    });
}

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