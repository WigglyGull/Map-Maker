//This whole thing is a mess resiting the urge to rewrite everything
const gridItem = require("./grid.js");
const biome = require("../tools/biome");
let createdNew = false;

exports.roomList = [];
exports.numOfRooms = 0;
exports.currentRoom = this.numOfRooms;
exports.currentRoomColor = biome.roomGrey;
exports.currentBorderColor = biome.roomDarkGrey;

//Todo: a cojoin room button

exports.createRoom = grid =>{
    createdNew = false;
    const neighbours = gridItem.getNeighbours(grid);
    const roomString = getClass(this.findPos(grid, null));
    const room = document.createElement("div");
    room.classList.add(roomString);
    room.classList.add(`${this.currentRoom}`);
    this.setStyle(room);
    grid.appendChild(room);
    this.roomList.push(room);

    let oneRoom = false;
    let diffrentStyle = false;
    let neighbourRooms = [];
    let neighbourStyles = [];

    const roomStyle = room.style.getPropertyValue("--room");
    neighbours.forEach((neighbour) =>{
        if(neighbour === undefined || neighbour.firstChild === null) return;
        changeNeighbour(neighbour);

        const neighbourStyle = neighbour.firstChild.style.getPropertyValue("--room");
        neighbourStyles.push(neighbourStyle);

        if(neighbour.firstChild.classList.item(1) === room.classList.item(1)){
            oneRoom = true;
            if(roomStyle !== neighbourStyle) diffrentStyle = true;
        }else if(!neighbourRooms.includes(neighbour.firstChild.classList.item(1))) neighbourRooms.push(neighbour.firstChild.classList.item(1)); 
    });

    //If theres only one room, the new room joins to it
    if(!oneRoom){
        const roomString = getClass(this.findPos(grid));
        room.className = "";
        neighbours.forEach(neighbour =>{
            if(neighbour === undefined || neighbour.firstChild === null) return;
            const neighbourRoom = neighbour.firstChild;
            const neighbourRoomNum = neighbourRoom.classList.item(1);
            room.classList.add(roomString);
            room.classList.add(neighbourRoomNum);
            changeNeighbour(neighbour);

            const neighbourStyle = neighbourRoom.style.getPropertyValue("--room");
            if(roomStyle !== neighbourStyle){
                diffrentStyle = true;
            }
        });
        if(neighbourRooms.length >= 2 && !diffrentStyle) createNewRoom(neighbours, grid); 
    }

    //If the rooms a diffrent colour it gets spawned apart
    if(diffrentStyle){
        if(getOccurrence(neighbourStyles, roomStyle) == 1){
            const roomString = getClass(this.findPosByStyle(grid));
            room.style = "";
            room.className = "";
            room.classList.add(roomString);

            this.setStyle(room);
            neighbours.forEach(neighbour => {
                if(neighbour === undefined || neighbour.firstChild === null) return;
                changeNeighbour(neighbour, true);
                if(roomStyle === neighbour.firstChild.style.getPropertyValue("--room"))room.classList.add(neighbour.firstChild.classList.item(1));
            });
        }else createNewRoom(neighbours, grid);
    }
 
    fillSqaures();
    if(!createdNew)this.currentRoom = room.classList.item(1);
    gridItem.setCurrentRoomEvent(room);
}

exports.findPos = (grid, isNeighbour) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = gridItem.getNeighbours(grid);

    if(directions.length !== neighbours.length) throw "Hey idoit these values aren't matching!!!!!";
    for (let i = 0; i < directions.length; i++) {
        if(neighbours[i] !== undefined && neighbours[i].firstChild !== null){
            const neighbour = neighbours[i].firstChild;
            const neighbourRoom = neighbour.classList.item(1);
            let mainRoom = undefined;
            
            if(isNeighbour === undefined && neighbour !== null) directions[i] = true; 
            else if(isNeighbour === null) mainRoom = this.currentRoom;
            else mainRoom = grid.firstChild.classList.item(1);
            
            if(mainRoom !== undefined && mainRoom === neighbourRoom) directions[i] = true;
        }
    }
    return directions;
}

exports.findPosByStyle = (grid) => {
    const directions = [left = false, right = false, top = false, bottom = false];
    const neighbours = gridItem.getNeighbours(grid);

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

exports.setStyle = (room, backColour, borderColor)=>{
    if(backColour === undefined){
        room.style.setProperty("--room", this.currentRoomColor);
        room.style.setProperty("--roomBorder", "black");
    }else{
        room.style.setProperty("--room", backColour);
        room.style.setProperty("--roomBorder", borderColor);
    }
}

//Checks if room has any neighbours
exports.singleRoom = (directions) => {
    let single = true;
    for (let index = 0; index < directions.length; index++) {
        if(directions[index] === true){
            single = false;
            return;
        }
    }
    return single;
}

const getOccurrence = (array, value) =>{
    var count = 0;
    array.forEach((v) => {
        if(v === value) count+=1;
    });
    return count;
}

const changeNeighbour = (grid, byStyle) =>{
    const room = grid.firstChild;
    const roomNum = room.classList.item(1);
    const directions = byStyle === undefined ? this.findPos(grid, true) : this.findPosByStyle(grid);
    const roomString = getClass(directions);
    const style = room.style.getPropertyValue("--room");
    const borderStyle = room.style.getPropertyValue("--roomBorder");

    if(this.singleRoom(directions)){
        gridItem.setDefault(room, style, roomNum);
        this.setStyle(room, style, borderStyle);
    }else{
        room.style = "";
        room.className = "";
        room.classList.add(roomString);
        room.classList.add(roomNum);
        room.style.animation = 'none';
        this.setStyle(room, style, borderStyle);
    }
}

const createNewRoom = (neighbours, grid)=>{
    grid.firstChild.remove();
    gridItem.createNewRoom(grid);
    createdNew = true;

    neighbours.forEach(neighbour => {
        if(neighbour === undefined || neighbour.firstChild === null) return;
        changeNeighbour(neighbour);
    });
}

//Goes through all the grids changing the class if it makes a sqaure
const fillSqaures=()=>{
    const gridList = gridItem.gridList;
    gridList.forEach(grid =>{
        const index = Number(grid.classList.item(1));
        const rightGrid = gridItem.checkRightSide(grid) ? undefined : gridList[index+1];
        const bottomGrid = gridList[index + gridItem.mapRows];
        const bottomRightGrid = gridList[index + (gridItem.mapRows+1)];

        if(rightGrid !== undefined && bottomGrid !== undefined && bottomRightGrid !== undefined){
            if(grid.firstChild !== null && rightGrid.firstChild !== null && bottomGrid.firstChild !== null && bottomRightGrid.firstChild !== null){
                const currentRoom = grid.firstChild.classList.item(1);
                if(rightGrid.firstChild.classList.item(1) === currentRoom && bottomGrid.firstChild.classList.item(1) === currentRoom && bottomRightGrid.firstChild.classList.item(1) === currentRoom){
                    const roomString = grid.firstChild.classList.item(0);
                    switch(roomString){
                        case "room-right-down": resetStyle(grid, "room-right-down-fill"); break;
                        case "room-left-right-down": resetStyle(grid, "room-left-right-down-fill"); break;
                        case "room-right-up-down": resetStyle(grid, "room-right-up-down-fill"); break;    
                        case "room-left-right-up-down": resetStyle(grid, "room-left-right-up-down-fill"); break;    
                    }
                }
            }
        }else return;
    });
}
const resetStyle = (grid, newString)=>{
    const room = grid.firstChild;
    const roomNum = room.classList.item(1);

    const style = room.style.getPropertyValue("--room");
    grid.style.background = style;

    room.className = "";
    room.classList.add(newString);
    room.classList.add(roomNum);
}

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

exports.changeNeighboursGlobal = (grid) =>{
    const neighbours = gridItem.getRoom(grid);

    //loops through the entier room resetting they way it looks
    neighbours.forEach((_neighbour) =>{
        const neighbour = _neighbour.parentElement;
        if(neighbour === undefined || neighbour.firstChild === null) return;
        changeNeighbour(neighbour);
        fillSqaures();
    });
}