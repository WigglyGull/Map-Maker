const grid = require("../grid/grid.js");

exports.createUndoRedoSystem = ()=>{
    let history = [];
    let position = 0;

    return {
        setHistory(firstGrid){
            history[0] = firstGrid; 
            console.log(position, history)
        },

        currentMap(){
            return history[position];
        },

        saveMap(){
            const map = document.querySelector(".gridHolder");
            const element = map.cloneNode(true);
            
            if (position < history.length - 1) {
                history = history.slice(0, position + 1);
            }
            history.push(element);
            position++;
            console.log(position, history.length-1, history)
        },

        draw(){
            const map = document.querySelector(".gridHolder");
            const currentMap = this.currentMap();
            const newMap = currentMap.cloneNode(true);
            map.replaceWith(newMap);
                
            newMap.childNodes.forEach(element => {
                grid.addEvents(element)
            });
        },

        undo(){
            if(position > 0) position -= 1;
            this.draw();
        },
    }
}