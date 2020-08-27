exports.createDoor = (grid, room) =>{
    const door = document.createElement("div");
    door.classList.add("door")
    grid.appendChild(door);
}