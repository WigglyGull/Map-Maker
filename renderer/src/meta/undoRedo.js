const grid = require("../grid/grid.js");

exports.createUndoRedoSystem = ()=>{
    let history = [];
    let position = 0;

    return {
        setHistory(firstGrid){
            history[0] = firstGrid; 
        },

        currentMap(){
            return history[position];
        },

        saveMap(){
            const map = document.querySelector(".gridHolder");
            const element = map.cloneNode(true);
            
            if (position < history.length - 1) history = history.slice(0, position + 1);
            history.push(element);
            position++;
        },

        draw(){
            const map = document.querySelector(".gridHolder");
            const currentMap = this.currentMap();
            const newMap = currentMap.cloneNode(true);
            map.replaceWith(newMap);
                
            newMap.childNodes.forEach(element => {
                grid.addEvents(element)
                if(element.firstChild !== null){
                    const elementChildren = element.childNodes;
                    for (let index = 0; index < elementChildren.length; index++) {
                        //removes entier animation
                        elementChildren[index].style.animationPlayState = "paused";
                        elementChildren[index].style.animationDelay = "-60s"
                    }
                }
            });
        },

        undo(){
            if(position > 0) position -= 1;
            this.draw();
        },

        redo(){
            if (position < history.length - 1) position += 1;
            this.draw();
        }
    }
}