const gridItem = require("./grid.js");

exports.findPos = grid => {
    let left=false, right=false, top=false, bottom = false;
    const neighbours = getNeighbours(grid);
    const [leftGrid, rightGrid, topGrid, bottomGrid] = neighbours;
    if(leftGrid !== undefined && leftGrid.firstChild !== null) left = true;
    if(rightGrid !== undefined && rightGrid.firstChild !== null) right = true;
    if(topGrid !== undefined && topGrid.firstChild !== null) top = true;
    if(bottomGrid !== undefined && bottomGrid.firstChild !== null) bottom = true;

    return directions = [left, right, top, bottom];
}

exports.createRoom = grid =>{
    const neighbours = getNeighbours(grid);
    const [leftGrid, rightGrid, topGrid, bottomGrid] = neighbours;
    const directions = this.findPos(grid);
    const roomString = getClass(directions);

    const room = document.createElement("div");
    room.classList.add(roomString);
    grid.appendChild(room);
    
    if(leftGrid !== undefined && leftGrid.firstChild !== null) this.changeNeighbour(leftGrid);
    if(rightGrid !== undefined && rightGrid.firstChild !== null) this.changeNeighbour(rightGrid);
    if(topGrid !== undefined && topGrid.firstChild !== null) this.changeNeighbour(topGrid);
    if(bottomGrid !== undefined && bottomGrid.firstChild !== null) this.changeNeighbour(bottomGrid);
}

exports.createNewRoom = (grid)=>{
    const room = document.createElement("div");
    room.classList.add("room");
    grid.appendChild(room);
}

exports.changeNeighbour = grid => {
    const leftDirections = this.findPos(grid);
    const leftRoomString = getClass(leftDirections);
    grid.firstChild.classList.remove(grid.firstChild.classList.item(0));
    grid.firstChild.classList.add(leftRoomString);
}

function getNeighbours(grid){
    const index = Number(grid.classList.item(1));
    const leftGrid = gridItem.gridList[index-1];
    const rightGrid = gridItem.gridList[index+1];
    const topGrid = gridItem.gridList[index - gridItem.mapRows];
    const bottomGrid = gridItem.gridList[index + gridItem.mapRows];

    return nieghbours = [leftGrid, rightGrid, topGrid, bottomGrid];
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