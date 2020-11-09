const roomItem = require("../grid/room");

exports.removeRoom = (grid) => {
    const room = grid.firstChild;
    const roomNum = room.classList.item(1);
    while(grid.firstChild){
        grid.removeChild(grid.firstChild);
    }

    roomItem.changeNeighboursGlobal(room);
    roomItem.currentRoom = roomNum;
    grid.style = null;
}