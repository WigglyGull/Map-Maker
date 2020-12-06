const tools = require("./tool");
const gridItem = require("../grid/grid.js");
let undoRedoSystem = undefined;

exports.editingText = false;

exports.createDoor = (grid, _undoRedoSystem) => {
    undoRedoSystem = _undoRedoSystem;
    grid.addEventListener("click", (e)=>{
        if(grid.firstChild === null || tools.activeTool !== "doorTool") return;

        if(this.editingText === true){
            this.editingText = false;
            return;
        }

        let width = grid.offsetWidth;
        let height = grid.offsetHeight;
        let x = e.clientX - grid.getBoundingClientRect().left;
        let y = e.clientY - grid.getBoundingClientRect().top;

        if(width/2 > x && height/2 > y){
            if(y > x) spawnDoor(grid, "left");
            else spawnDoor(grid, "top");
        }else if(width/2 < x && height/2 > y){
            if(checkDistance(y, 0) > checkDistance(x, 70)) spawnDoor(grid, "right");
            else spawnDoor(grid, "top");
        }else if(width/2 > x && height/2 < y){
            if(checkDistance(x, 0) < checkDistance(y, 70)) spawnDoor(grid, "left");
            else spawnDoor(grid, "bottom");
        }else if(width/2 < x && height/2 < y){
            if(y < x) spawnDoor(grid, "right");
            else spawnDoor(grid, "bottom");
        }
        undoRedoSystem.saveMap();
    });
    
}

const spawnDoor = (grid, direction) =>{
    const otherDoors = this.getDoors(grid);
    let alreadyHasDoor = false;
    otherDoors.forEach(door=> {
        if(direction === "left" && door.classList.item(0) == "doorLeft"){
            alreadyHasDoor = true;
            return;
        }else if(direction === "right" && door.classList.item(0) == "doorRight"){
            alreadyHasDoor = true;
            return;
        }else if(direction === "bottom" && door.classList.item(0) == "doorDown"){
            alreadyHasDoor = true;
            return;
        }else if(direction === "top" && door.classList.item(0) == "doorUp"){
            alreadyHasDoor = true;
            return;
        }
    })
    if(alreadyHasDoor === true) return;

    const door = document.createElement("div");
    const room = grid.firstChild;
    const roomStyle = room.style;

    let neighbourStyle = undefined;
    const neighbours = gridItem.getNeighbours(grid);
    const [leftGrid, rightGrid, topGrid, bottomGrid] = neighbours;

    const roomColour = room.style.getPropertyValue("--roomBorder");
    door.style.setProperty("--background", roomColour);
    switch(direction) {
        case"right": 
            if(checkSpawnable(room, rightGrid.firstChild)) return;

            door.classList.add("doorRight"); 
            roomStyle.borderTopRightRadius = "0rem";
            roomStyle.borderBottomRightRadius = "0rem";

            neighbourStyle = rightGrid.firstChild.style;
            spawnNeighbourDoor(grid, rightGrid, "left", neighbourStyle.borderBottomLeftRadius, neighbourStyle.borderTopLeftRadius);
            break;
        case"bottom": 
            if(checkSpawnable(room, bottomGrid.firstChild)) return;

            door.classList.add("doorDown");
            roomStyle.borderBottomRightRadius = "0rem";
            roomStyle.borderBottomLeftRadius = "0rem"; 

            neighbourStyle = bottomGrid.firstChild.style;
            spawnNeighbourDoor(grid, bottomGrid, "top", neighbourStyle.borderTopLeftRadius, neighbourStyle.borderTopRightRadius);
            break;
        case"left":
            if(checkSpawnable(room, leftGrid.firstChild)) return;

            door.classList.add("doorLeft");
            roomStyle.borderTopLeftRadius = "0rem";
            roomStyle.borderBottomLeftRadius = "0rem"; 

            neighbourStyle = leftGrid.firstChild.style;
            spawnNeighbourDoor(grid, leftGrid, "right", neighbourStyle.borderTopRightRadius, neighbourStyle.borderBottomRightRadius);
            break;
        case"top":
            if(checkSpawnable(room, topGrid.firstChild)) return;

            door.classList.add("doorUp");
            roomStyle.borderTopRightRadius = "0rem";
            roomStyle.borderTopLeftRadius = "0rem"; 

            neighbourStyle = topGrid.firstChild.style;
            spawnNeighbourDoor(grid, topGrid, "bottom", neighbourStyle.borderBottomLeftRadius, neighbourStyle.borderBottomRightRadius);
            break;
    }
    grid.appendChild(door);
}

const checkSpawnable = (room, neighbour) => {
    if(neighbour === null) return true;
    const roomNum = room.classList.item(1) === null ? room.classList.item(0) : room.classList.item(1);
    const neighbourRoomNum = neighbour.classList.item(1) === null ? neighbour.classList.item(0) : neighbour.classList.item(1);
    if(roomNum === neighbourRoomNum) return true;
}

const spawnNeighbourDoor = (grid, neighbourGrid, direction, corner1, corner2) =>{
    if(corner1 !== "0rem" || corner2 !== "0rem"){
        spawnDoor(neighbourGrid, direction);
    }
}

const checkDistance = (currentNum, targetNum)=>{
    let distance = Math.round(currentNum);
    for (let i = 0; i < 100; i++) {
        if(targetNum < currentNum) distance -= 1;
        else distance += 1;

        if(targetNum === distance) return i;
    }
}

exports.getDoors = (grid)=>{
    const children = grid.children;
    let doors = [];
    for (let i = 0; i < children.length; i++) {
        const childClass = children[i].classList.item(0)
        if(childClass === "doorRight" || childClass === "doorDown" || childClass === "doorLeft" || childClass === "doorUp"){
            doors.push(children[i]);
        }
    }
    return doors;
}