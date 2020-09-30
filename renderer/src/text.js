const gridItem = require("./grid");
const tools = require("./tool");
const icon = require("./icon");
const door = require("./door");

exports.createText = (grid) => {
    grid.addEventListener("click", ()=>{
        if(grid.firstChild === null || tools.activeTool !== "textTool") return;

        const rooms = gridItem.getRoom(grid.firstChild);
        const mainRoom = rooms[0].parentElement;
        if(mainRoom.querySelector(".text") !== null) return;

        const textBox = document.createElement("div");
        const text = document.createElement("input");

        text.setAttribute("type", "text");
        text.setAttribute("placeholder", "Room");
        text.setAttribute("maxlength", "8");

        text.addEventListener("click", ()=>{
            if(tools.activeTool === "iconTool") icon.editingText = true;
            if(tools.activeTool === "doorTool") door.editingText = true;
        });

        textBox.classList.add("textBox");
        text.classList.add("text");
        textBox.appendChild(text);

        mainRoom.appendChild(textBox);
    });
}