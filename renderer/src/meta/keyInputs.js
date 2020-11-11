exports.holdingShift = false;
exports.holdingControl = false;

exports.getKeyEvents = undoRedoSystem =>{
    window.addEventListener("keydown", (e)=>{
        if(e.key === "Shift" && this.holdingShift === false){
            this.holdingShift = true;
        }

        if(e.key === "Control") this.holdingControl = true;
        if(this.holdingControl && e.key === "z") undoRedoSystem.undo();
    });

    window.addEventListener("keyup", (e)=>{
        if(e.key === "Shift") this.holdingShift = false;
        if(e.key === "Control") this.holdingControl = false;
    });
}