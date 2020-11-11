const grid = require("./src/grid/grid.js");
const tool = require("./src/tools/tool.js");
const biome = require("./src/tools/biome.js");
const keyInput = require("./src/meta/keyInputs.js");
const icon = require("./src/tools/icon.js");
const undoRedo = require("./src/meta/undoRedo");

const gridHolder = document.querySelector(".gridHolder");
const undoRedoSystem = undoRedo.createUndoRedoSystem();
let tools = document.querySelectorAll(".tool");

grid.getUndoRedoSystem(undoRedoSystem);
keyInput.getKeyEvents(undoRedoSystem);
tool.createToolbar(tools);
biome.createBiome();
grid.createGrid(gridHolder);
icon.createIconSelector();

tool.setActive(tools[0], tools);