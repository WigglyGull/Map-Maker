const roomItem = require("../grid/room");
const gridItem = require("../grid/grid");

exports.removeRoom = (grid) => {
    const room = grid.firstChild;
    const roomNum = room.classList.item(1);
    
    const gridNum = grid.classList.item(1);
    const fullRoom = gridItem.getRoom(room)
    while(grid.firstChild){
        const roomDir = grid.firstChild.classList.item(0)
        if(roomDir === "doorRight" || roomDir === "doorDown" || roomDir === "doorLeft" || roomDir === "doorUp"){
            removeDoors(grid, roomDir);
            doorList.push(roomDir);
        }
        grid.removeChild(grid.firstChild);
    }

    roomItem.changeNeighboursGlobal(room);
    roomItem.currentRoom = roomNum;
    grid.style = null;

    spearteRoom(gridNum, fullRoom, grid);
}

const spearteRoom=(gridNum, fullRoom, grid)=>{
    let topRoom = [];
    let bottomRoom = [];

    fullRoom.forEach(room=>{
        if(room.parentElement === null) return;
        const roomNum = room.parentElement.classList.item(1);

        if(roomNum < gridNum) topRoom.push(room);
        else if(roomNum > gridNum) bottomRoom.push(room);
    });

    roomItem.numOfRooms++;
    bottomRoom.forEach(room=>{
        const roomNum = room.classList.item(1);
        room.classList.remove(`${roomNum}`);
        room.classList.add(`${roomItem.numOfRooms}`);
    });
    gridItem.setCurrentRoom(grid.firstChild);
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