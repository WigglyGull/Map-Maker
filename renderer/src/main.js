//Sets icon depending on if its in darkmode
const setIcon = ()=>{
    const darkMode = localStorage.getItem("darkMode");
    if(darkMode === "false")return;
    else{
        //Setting Bar
        const settingIcon = document.querySelector(".settingIcon");
        const restartIcon = document.querySelector(".restartIcon");
        const saveIcon = document.querySelector(".saveIcon");
        const exportIcon = document.querySelector(".exportIcon");
        const exitIcon = document.querySelector(".exitIcon");
        
        settingIcon.src = "../assets/settings/SettingIconWhite.svg";
        restartIcon.src = "../assets/settings/RestartWhite.svg";
        saveIcon.src = "../assets/settings/SaveWhite.svg";
        exportIcon.src = "../assets/settings/ExportWhite.svg";
        exitIcon.src = "../assets/settings/ExitWhite.svg";

        //Tool Bar
        const roomIcon = document.querySelector(".sqaureIcon");
        const doorIcon = document.querySelector(".doorIcon");
        const keyIcon = document.querySelector(".keyIcon");
        const textIcon = document.querySelector(".textIcon");

        roomIcon.src = "../assets/ui/sqaureWhite.svg";
        doorIcon.src = "../assets/ui/doorWhite.svg";
        keyIcon.src = "../assets/icons/keyWhite.svg";
        textIcon.src = "../assets/ui/textWhite.svg";

        //Biome Bar
        const plusIcon = document.querySelector(".plusIcon");
        plusIcon.src = "../assets/ui/plusWhite.svg";

        //Sets css to be in dark mode
        document.documentElement.setAttribute("data-theme", "dark");
    }
}
setIcon();

//popups only when  opened from menu
if(localStorage.getItem("restart") === "true"){
    const mapHolder = document.querySelector(".restart");
    mapHolder.classList.remove("restart");
}

//Dont act like you dont know what this is doing
const grid = require("./src/grid/grid.js");
const tool = require("./src/tools/tool.js");
const biome = require("./src/tools/biome.js");
const keyInput = require("./src/meta/keyInputs.js");
const icon = require("./src/tools/icon.js");
const undoRedo = require("./src/meta/undoRedo");
const settings = require("./src/tools/settings.js");
const saveSystem = require("./src/meta/saveSystem");

const load = localStorage.getItem("load");

//Getting Elements from dom that setup functions need
const gridHolder = document.querySelector(".gridHolder");
const undoRedoSystem = undoRedo.createUndoRedoSystem();
let tools = document.querySelectorAll(".tool");

//Function called in settings.js to open menu.html
const loadMenu =()=>{window.location.replace("./menu.html");} 

let setColours = setInterval(function(){ biome.resetColours(); }, 1);
biome.createBiome();
grid.getUndoRedoSystem(undoRedoSystem);
keyInput.getKeyEvents(undoRedoSystem);
settings.setUpSettings(loadMenu);
tool.createToolbar(tools);
icon.createIconSelector();

//Sets the first tool to be active
tool.setActive(tools[0], tools);

if(load === "false")grid.createGrid(gridHolder);
else biome.loadMap = true;