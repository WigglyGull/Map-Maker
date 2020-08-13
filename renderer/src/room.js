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
    
    const rooms = []
    neighbours.forEach(neighbour =>{
        if(neighbour === undefined || neighbour.firstChild === null) return;
        this.changeNeighbour(neighbour);

        const neighbourRoomNum = neighbour.firstChild.classList.item(1);
        rooms.push(neighbourRoomNum);
    });
    for (let i = 0; i < rooms.length; i++) {
        if(i === 1){
            if(rooms[i] !== rooms[i - 1]){
                setRoomNum(rooms[i], rooms[i-1]);
            }
        }
    }
    setStyle(grid.firstChild, roomString);
    fillSqaures();
}

//Spawns a sperate room
exports.createNewRoom = (grid, roomString)=>{
    const room = document.createElement("div");
    if(roomString === "") setStyle(room, roomString);
    grid.appendChild(room);
    this.roomList.push(room);
    fillSqaures();
}

const setStyle = (room, roomString) => {
    if(roomString === ""){
        room.style.width = "6.7rem";
        room.style.height = "6.7rem";
        room.style.background = "#9F9F9F";
        room.style.zIndex = "2";
        room.style.border = "0.3rem solid #383838";
        room.style.borderRadius = "0.4rem";
        this.numOfRooms++;
    }else room.classList.add(roomString);
    console.log(this.numOfRooms);
    room.classList.add(`${this.numOfRooms}`);
}

const setRoomNum = (firstRoom, secondRoom) => {
    this.numOfRooms -= 1;
    const mainRoom = Math.min(firstRoom, secondRoom);
    const changeRoom = Math.max(firstRoom, secondRoom);
    
    const gridList = gridItem.gridList;
    gridList.forEach((grid)=>{
        if(grid.firstChild === null) return;
        const room = grid.firstChild;
        if(room.classList.item(1) === `${changeRoom}`){
            console.log("doing a thing");
            const roomString = room.classList.item(0);
            room.className = "";
            room.classList.add(roomString);
            room.classList.add(mainRoom);
        }
    })
}

//Changes class to fit with the new room placement
exports.changeNeighbour = (grid)=>{
    const directions = this.findPos(grid);
    const roomString = getClass(directions);
    const room = grid.firstChild;
    let roomNum = room.classList.item(1) === null ? room.classList.item(0) : room.classList.item(1);
    
    room.style = "";
    room.className = "";
    room.classList.add(roomString);
    room.classList.add(roomNum);
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
                    case "room-right-down": resetStyle(grid, "room-right-down-fill"); break;
                    case "room-left-right-down": resetStyle(grid, "room-left-right-down-fill"); break;
                    case "room-right-up-down": resetStyle(grid, "room-right-up-down-fill"); break;    
                    case "room-left-right-up-down": resetStyle(grid, "room-left-right-up-down-fill"); break;    
                }
            }
        }else return;
    });
}
const resetStyle = (grid, newString)=>{
    const roomNum = grid.firstChild.classList.item(1);
    grid.style.background = "#9F9F9F";
    grid.firstChild.className = "";
    grid.firstChild.classList.add(newString);
    grid.firstChild.classList.add(roomNum);
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