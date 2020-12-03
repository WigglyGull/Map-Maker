const toolItem = require("../tools/tool");

exports.holdingShift = false;
exports.holdingControl = false;

exports.getKeyEvents = undoRedoSystem =>{
    window.addEventListener("keydown", (e)=>{
        if(e.key === "Shift" && this.holdingShift === false){
            this.holdingShift = true;
        }

        //Undo redo shortcut
        if(e.key === "Control") this.holdingControl = true;
        if(this.holdingControl && e.key === "z") undoRedoSystem.undo();
        if(this.holdingControl && e.key === "y") undoRedoSystem.redo();

        //selecting tools shortcut
        if(this.holdingControl && e.key === "1") toolItem.setActive(toolItem.tools[0], toolItem.tools);
        if(this.holdingControl && e.key === "2") toolItem.setActive(toolItem.tools[1], toolItem.tools);
        if(this.holdingControl && e.key === "3") toolItem.setActive(toolItem.tools[2], toolItem.tools);
        if(this.holdingControl && e.key === "4") toolItem.setActive(toolItem.tools[3], toolItem.tools);
    });
    
    window.addEventListener("keyup", (e)=>{
        if(e.key === "Shift") this.holdingShift = false;
        if(e.key === "Control") this.holdingControl = false;
    });
}