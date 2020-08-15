const gridItem = require("./grid.js");
const keyInputs = require("./keyInputs"); 

exports.roomList = [];
exports.numOfRooms = 0;
exports.currentRoom = this.numOfRooms;

//Joins a room to another room and changes neighbours
exports.createRoom = grid =>{
    const neighbours = getNeighbours(grid);
    this.createNewRoom(grid, "something");
    
    const roomNums = [];
    let sameRoom = false;
    setStyle(grid.firstChild, grid);

    neighbours.forEach((neighbour, index) =>{
        if(neighbour === undefined || neighbour.firstChild === null) return;
        
        if(keyInputs.holdingShift === true) changeNeighbour(neighbour);
        else changeNeighbour(neighbour, true);
        
        const neighbourRoomNum = neighbour.firstChild.classList.item(1);
        roomNums.push(neighbourRoomNum);
        if(neighbourRoomNum === grid.firstChild.classList.item(1)){
            sameRoom = true;
        }
    });
    if(!sameRoom){
        neighbours.forEach(neighbour =>{
            if(neighbour === undefined || neighbour.firstChild === null) return;
            changeNeighbour(neighbour);
            const room = grid.firstChild;
            const roomString = room.classList.item(0);
            room.className = "";
            room.classList.add(roomString);
            room.classList.add(neighbour.firstChild.classList.item(1));
        });
    }
    setStyle(grid.firstChild, grid, true);
    
    for (let i = 0; i < roomNums.length; i++) {
        if(roomNums[i] !== roomNums[i+1] && roomNums[i+1] !== undefined){
            setRoomNum(roomNums[i], roomNums[i+1]);
            break;
        }
    }

    gridItem.fillSqaures();
    this.currentRoom = grid.firstChild.classList.item(1);
}

//Spawns a sperate room
exports.createNewRoom = (grid, roomString)=>{
    const room = document.createElement("div");
    if(roomString === ""){
        room.style.width = "6.7rem";
        room.style.height = "6.7rem";
        room.style.background = "#9F9F9F";
        room.style.zIndex = "2";
        room.style.border = "0.3rem solid #383838";
        room.style.borderRadius = "0.4rem";
        this.numOfRooms++;
        room.classList.add(`${this.numOfRooms}`);
        this.currentRoom = room.classList.item(0);
    }
    grid.appendChild(room);
    this.roomList.push(room);
    gridItem.fillSqaures();
}

//Sets direction depending if the neighbouring grids have a room
exports.findPos = (grid, isNeighbour) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = getNeighbours(grid);

    if(directions.length !== neighbours.length) throw "Hey idoit these values aren't matching!!!!!";
    for (let i = 0; i < directions.length; i++) {
        if(neighbours[i] === undefined) continue;
        if(neighbours[i].firstChild !== null){
            if(isNeighbour === undefined){
                if(neighbours[i].firstChild !== null) directions[i] = true; 
            }else if(isNeighbour === null){
                const mainRoom = this.currentRoom;
                const neighbourRoom = neighbours[i].firstChild.classList.item(1) === null ? neighbours[i].firstChild.classList.item(0) : neighbours[i].firstChild.classList.item(1);
                if(mainRoom == neighbourRoom) directions[i] = true;
            }else{
                const mainRoom = grid.firstChild.classList.item(1) === null ? grid.firstChild.classList.item(0) : grid.firstChild.classList.item(1);
                const neighbourRoom = neighbours[i].firstChild.classList.item(1) === null ? neighbours[i].firstChild.classList.item(0) : neighbours[i].firstChild.classList.item(1);
                if(mainRoom == neighbourRoom) directions[i] = true;
            }
        }
    }
    return directions;
}

const setStyle = (room, grid, neighbour) => {
    const directions = neighbour === undefined ? this.findPos(grid) : this.findPos(grid, null);
    const roomString = getClass(directions);

    room.style = "";
    room.className = "";
    room.classList.add(roomString);
    room.classList.add(`${this.numOfRooms}`);
}

const setRoomNum = (firstRoom, secondRoom) => {
    this.numOfRooms -= 1;
    const mainRoom = Math.min(firstRoom, secondRoom);
    const changeRoom = Math.max(firstRoom, secondRoom);
    
    this.roomList.forEach((room)=>{
        if(room.classList.item(1) === `${changeRoom}`){
            const roomString = room.classList.item(0);
            room.className = "";
            room.classList.add(roomString);
            room.classList.add(mainRoom);
        }
    });
}

//Changes class to fit with the new room placement
const changeNeighbour = (grid, merge) =>{
    const room = grid.firstChild;
    const roomNum = room.classList.item(1) === null ? room.classList.item(0) : room.classList.item(1);
    const directions = this.findPos(grid, merge);
    const roomString = getClass(directions);
    
    room.style = "";
    room.className = "";
    room.classList.add(roomString);
    room.classList.add(roomNum);
}

//Returns the surrounding grids
function getNeighbours(grid){
    const index = gridItem.gridIndex(grid);
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