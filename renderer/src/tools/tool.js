const activeClass = "activeTool";
const icon = require("./icon");

exports.activeTool;
exports.tools;

exports.createToolbar = tools => {
    if(tools === null){
        console.error("Tools not found");
        return;
    }

    this.tools = tools;
    tools.forEach(tool => {
        tool.addEventListener("click", ()=>{
            if(tool.classList.contains(activeClass)) return;
            else this.setActive(tool, tools); 
            icon.closeSelector();  
        });
    });
}

exports.setActive=(currentTool, tools)=>{
    tools.forEach(tool => {
        if(tool === currentTool){
            tool.classList.add(activeClass);
            this.activeTool = tool.classList.item(0);
            return;
        } 
        tool.classList.remove(activeClass);
    });
}