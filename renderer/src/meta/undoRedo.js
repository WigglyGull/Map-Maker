const grid = require("../grid/grid.js");

exports.createUndoRedoSystem = ()=>{
    let history = [];
    let position = -1;

    return {
        currentMap(){
            return history[position];
        },

        saveMap(){
            const map = document.querySelector(".gridHolder");
            const element = map.cloneNode(true);
            
            if (position < history.length - 1) history = history.slice(0, position + 1);
            history.push(element);
            position += 1;

            for (let index = 0; index < history.length; index++) {
                console.log(history[index]);
            }
        },

        undo(){
            if(position > 0){
                const map = document.querySelector(".gridHolder");
                position -= 1;
                map.replaceWith(this.currentMap());
            }
        },

        redo(){
            if (position < history.length - 1) {
                const map = document.querySelector(".gridHolder");
                position += 1;
                map.replaceWith(this.currentMap());
            }
        }
    }
}