const activeClass = "activeTool";
let activeTool;

exports.createToolbar = tools => {
    tools.forEach(tool => {
        tool.addEventListener("click", ()=>{
            if(tool.classList.contains(activeClass)) tool.classList.remove(activeClass);
            else{
                tool.classList.add(activeClass);
                setActive(tool, tools);
            }
        });
    });
}

function setActive(currentTool, tools){
    tools.forEach(tool => {
        if(tool === currentTool) return;
        tool.classList.remove(activeClass);
    });
    activeTool = currentTool;
}