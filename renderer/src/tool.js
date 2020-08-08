const activeClass = "activeTool";
exports.activeTool;

exports.createToolbar = tools => {
    if(tools === null){
        console.error("Tools not found");
        return;
    }

    tools.forEach(tool => {
        tool.addEventListener("click", ()=>{
            if(tool.classList.contains(activeClass)) tool.classList.remove(activeClass);
            else{
                this.setActive(tool, tools);
            }
        });
    });
}

exports.setActive=(currentTool, tools)=>{
    tools.forEach(tool => {
        if(tool === currentTool){
            tool.classList.add(activeClass);
            this.activeTool = tool;
            return;
        } 
        tool.classList.remove(activeClass);
    });
}