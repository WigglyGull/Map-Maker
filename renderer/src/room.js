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
        if(neighbours[i].firstChild !== null)directions[i] = true; 
    }
    return directions;
}

exports.findPosNeighbour = (grid) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = getNeighbours(grid);

    if(directions.length !== neighbours.length) throw "Hey idoit these values aren't matching!!!!!";
    for (let i = 0; i < directions.length; i++) {
        if(neighbours[i] === undefined) continue;
        if(neighbours[i].firstChild !== null){
            const mainRoom = grid.firstChild.classList.item(1) === null ? grid.firstChild.classList.item(0) : grid.firstChild.classList.item(1);
            const neighbourRoom = neighbours[i].firstChild.classList.item(1) === null ? neighbours[i].firstChild.classList.item(0) : neighbours[i].firstChild.classList.item(1);
            if(mainRoom == neighbourRoom) directions[i] = true;
        }
    }
    return directions;
}

//Joins a room to another room and changes neighbours
exports.createRoom = grid =>{
    gridItem.fillSqaures();
    const neighbours = getNeighbours(grid);
    this.createNewRoom(grid, "something");
    
    const rooms = []
    setStyle(grid.firstChild, "something", grid);
    neighbours.forEach(neighbour =>{
        if(neighbour === undefined || neighbour.firstChild === null) return;
        changeNeighbour(neighbour);
        
        const neighbourRoomNum = neighbour.firstChild.classList.item(1);
        rooms.push(neighbourRoomNum);
    });
    for (let i = 0; i < rooms.length; i++) {
        if(i === 1 && rooms[i] !== rooms[i - 1]) setRoomNum(rooms[i], rooms[i-1]);
    }
    gridItem.fillSqaures();
}

//Spawns a sperate room
exports.createNewRoom = (grid, roomString)=>{
    const room = document.createElement("div");
    if(roomString === "") setStyle(room, roomString);
    grid.appendChild(room);
    this.roomList.push(room);
    gridItem.fillSqaures();
}

const setStyle = (room, roomString, grid) => {
    if(roomString === ""){
        room.style.width = "6.7rem";
        room.style.height = "6.7rem";
        room.style.background = "#9F9F9F";
        room.style.zIndex = "2";
        room.style.border = "0.3rem solid #383838";
        room.style.borderRadius = "0.4rem";
        this.numOfRooms++;
    }else{
        const directions = this.findPos(grid);
        const roomString = getClass(directions);
        room.classList.add(roomString);
    }
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
            const roomString = room.classList.item(0);
            room.className = "";
            room.classList.add(roomString);
            room.classList.add(mainRoom);
        }
    })
}

//Changes class to fit with the new room placement
const changeNeighbour = (grid) =>{
    const room = grid.firstChild;
    const roomNum = room.classList.item(1) === null ? room.classList.item(0) : room.classList.item(1);
    const directions = this.findPosNeighbour(grid);
    const roomString = getClass(directions);
    
    room.style = "";
    room.className = "";
    room.classList.add(roomString);
    room.classList.add(roomNum);
}

//Returns the surrounding grids
function getNeighbours(grid){
    const index = Number(grid.classList.item(1));
    const leftGrid = gridItem.checkLeftSide(grid) ? leftGrid = undefined : gridItem.gridList[index-1];
    const rightGrid = gridItem.checkRightSide(grid) ? rightGrid = undefined : gridItem.gridList[index+1];
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