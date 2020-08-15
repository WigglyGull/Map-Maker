exports.holdingShift = false;

exports.getKeyEvents = ()=>{
    window.addEventListener("keydown", (e)=>{
        if(e.key === "Shift" && this.holdingShift === false){
            this.holdingShift = true;
        }
    });

    window.addEventListener("keyup", (e)=>{
        if(e.key === "Shift"){
            this.holdingShift = false;
        }
    });
}