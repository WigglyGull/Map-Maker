const roomItem = require("../grid/room");
const gridItem = require("../grid/grid");

exports.removeRoom = (grid) => {
    const room = grid.firstChild;
    const roomNum = room.classList.item(1);
    
    while(grid.firstChild){
        const roomDir = grid.firstChild.classList.item(0)
        if(roomDir === "doorRight" || roomDir === "doorDown" || roomDir === "doorLeft" || roomDir === "doorUp") removeDoors(grid, roomDir);
        grid.removeChild(grid.firstChild);
    }

    roomItem.currentRoom = roomNum;
    grid.style = null;

    spearteRoom(room, grid);
    roomItem.changeNeighboursGlobal(room);
}

const spearteRoom=(gridFirstChild, grid)=>{
    //Splits the fullRoom into two parts 
    let topRoom = [];
    let bottomRoom = [];
    const fullRoom = gridItem.getRoom(gridFirstChild);
    const gridNum = grid.classList.item(1);
    console.log(fullRoom)

    //loops through the room splitting it in half
    fullRoom.forEach(room=>{
        const roomNum = Number(room.parentElement.classList.item(1));
        if(roomNum < gridNum) topRoom.push(room), room.classList.add("topRoom");
        if(roomNum > gridNum) bottomRoom.push(room);
    });

    //Removes bottom rooms that are still connected to top rooms
    for (let index = 0; index < bottomRoom.length; index++) {
        const room = bottomRoom[index];
        const roomNeighbours = gridItem.getNeighbours(room.parentElement);
        let isGood = true;
        roomNeighbours.forEach(neighbour=>{
            if(neighbour.firstChild === null)return;
            let _neighbour = neighbour.firstChild;
            if(_neighbour.classList.item(2) === "topRoom") {
                bottomRoom.splice(index, 1);
                index--;
                topRoom.push(room);
                isGood = false;
            }
        });
        if(isGood) room.classList.add("bottomRoom");
    }

    let cancleOut = false;
    //checks if rooms split
    topRoom.forEach(room=>{
        room.classList.remove("topRoom");
        const roomNeighbours = gridItem.getNeighbours(room.parentElement);
        roomNeighbours.forEach(neighbour=>{
            if(neighbour === undefined || neighbour.firstChild === null)return;
            let _neighbour = neighbour.firstChild;
            if(_neighbour.classList.item(2) === "bottomRoom") cancleOut = true;
        });
    });
    //if rooms dont split cancle
    if(cancleOut) return;
    if(topRoom.length === 0) return;
    

    // sets the bottom room back to default borders and a new room number
    console.log(topRoom)
    roomItem.numOfRooms++;
    bottomRoom.forEach(room=>{
        //Sets room to a new room class
        const roomNum = room.classList.item(1);
        room.classList.remove("bottomRoom");
        room.classList.remove(`${roomNum}`)
        room.classList.add(`${roomItem.numOfRooms}`);
        //updates directions
        roomItem.changeNeighboursGlobal(room);
        gridItem.setRoomColoursBack(room);
    });
}

const removeDoors = (grid, doorDir)=>{
    const neighbours = gridItem.getNeighbours(grid);
    neighbours.forEach(neighbour =>{
        if(neighbour === undefined || neighbour.firstChild === null) return;
        const children = neighbour.children;
        const room = neighbour.firstChild;

        room.style.borderBottomLeftRadius = null;
        room.style.borderBottomRightRadius = null;
        room.style.borderTopRightRadius = null;
        room.style.borderTopLeftRadius = null;

        for (var i = 0; i < children.length; i++) {
            const currentDoorDir = children[i].classList.item(0);
            if(doorDir === "doorRight" && currentDoorDir === "doorLeft") children[i].remove();
            if(doorDir === "doorLeft" && currentDoorDir === "doorRight") children[i].remove();
            if(doorDir === "doorUp" && currentDoorDir === "doorDown") children[i].remove();
            if(doorDir === "doorDown" && currentDoorDir === "doorUp") children[i].remove();
        }
    });
}