const roomItem = require("../grid/room");
const gridItem = require("../grid/grid");

var hasDoor;
exports.removeRoom = (grid) => {
    const room = grid.firstChild;
    const roomNum = room.classList.item(1);
    
    while(grid.firstChild){
        const roomDir = grid.firstChild.classList.item(0)
        if(roomDir === "doorRight" || roomDir === "doorDown" || roomDir === "doorLeft" || roomDir === "doorUp") removeDoors(grid, roomDir);
        grid.removeChild(grid.firstChild);
    }

    roomItem.changeNeighboursGlobal(room);
    roomItem.currentRoom = roomNum;
    grid.style = null;
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