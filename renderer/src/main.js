const grid = require("./src/grid/grid.js");
const tool = require("./src/tools/tool.js");
const biome = require("./src/tools/biome.js");
const keyInput = require("./src/meta/keyInputs.js");
const icon = require("./src/tools/icon.js");

const gridHolder = document.querySelector(".gridHolder");
let tools = document.querySelectorAll(".tool");

keyInput.getKeyEvents();
tool.createToolbar(tools);
biome.createBiome();
grid.createGrid(gridHolder);
icon.createIconSelector();

tool.setActive(tools[0], tools);