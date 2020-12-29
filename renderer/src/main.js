//Dont act like you dont know what this is doing
const grid = require("./src/grid/grid.js");
const tool = require("./src/tools/tool.js");
const biome = require("./src/tools/biome.js");
const keyInput = require("./src/meta/keyInputs.js");
const icon = require("./src/tools/icon.js");
const undoRedo = require("./src/meta/undoRedo");
const settings = require("./src/settings/settings.js");

//Getting Elements from dom that setup functions need
const gridHolder = document.querySelector(".gridHolder");
const undoRedoSystem = undoRedo.createUndoRedoSystem();
let tools = document.querySelectorAll(".tool");

//Function called in settings.js to open menu.html
const loadMenu =()=>{window.location.replace("./menu.html");}

//Running all the components setup functions
grid.getUndoRedoSystem(undoRedoSystem);
keyInput.getKeyEvents(undoRedoSystem);
tool.createToolbar(tools);
biome.createBiome();
grid.createGrid(gridHolder);
icon.createIconSelector();
settings.setUpSettings(loadMenu);

//Sets the first tool to be active
tool.setActive(tools[0], tools);

//Sets icon depending on 
const setIcon = ()=>{
    if(!darkMode) return;
    else{
        const settingIcon = document.querySelector("settingIcon");
        const restartIcon = document.querySelector("restartIcon");
        
        settingIcon.src = "../assets/settings/SettingIconWhite.svg";
    }
}
setIcon();