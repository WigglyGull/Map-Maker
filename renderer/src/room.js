const gridItem = require("./grid.js");

exports.findPos = grid => {
    let left=false, right=false, top=false, bottom = false;
    const index = Number(grid.classList.item(1));
    const leftGrid = gridItem.gridList[index-1];
    const rightGrid = gridItem.gridList[index+1];
    const topGrid = gridItem.gridList[index - gridItem.mapRows];
    const bottomGrid = gridItem.gridList[index + gridItem.mapRows];

    if(leftGrid !== undefined && leftGrid.firstChild !== null) left = true;
    if(rightGrid !== undefined && rightGrid.firstChild !== null) right = true;
    if(topGrid !== undefined && topGrid.firstChild !== null) top = true;
    if(bottomGrid !== undefined && bottomGrid.firstChild !== null) bottom = true;

    return directions = [left, right, top, bottom];
}

exports.createRoom = (grid, directions)=>{
    const [left, right, up, down] = directions;
    if(up){
        if(down){
            if(right){
                if(left) this.createNewRoom(grid, "room-left-right-up-down");
                else this.createNewRoom(grid, "room-right-up-down");
            }else if(left) this.createNewRoom(grid, "room-left-up-down");
            else this.createNewRoom(grid, "room-up-down");
        }else{
            if(right){
                if(left) this.createNewRoom(grid, "room-left-right-up");
                else this.createNewRoom(grid, "room-right-up");
            }else if(left) this.createNewRoom(grid, "room-left-up");
            else this.createNewRoom(grid, "room-up");
        }
        return;
    }
    if(down){
        if(right){
            if(left)this.createNewRoom(grid, "room-left-right-down");
            else this.createNewRoom(grid, "room-right-down");
        }else if(left) this.createNewRoom(grid, "room-left-down");
        else this.createNewRoom(grid, "room-down");
        return;
    }
    if(right)
        if(left) this.createNewRoom(grid, "room-left-right");
        else this.createNewRoom(grid, "room-right");
    else this.createNewRoom(grid, "room-left");
    
}

exports.createNewRoom = (grid, roomClass)=>{
    const room = document.createElement("div");
    room.classList.add(roomClass);
    grid.appendChild(room);
}