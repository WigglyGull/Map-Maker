const grid = require("./src/grid.js");
const tool = require("./src/tool.js");
const biome = require("./src/biome.js");
const keyInput = require("./src/keyInputs.js");
const icon = require("./src/icon.js");

const gridHolder = document.querySelector(".gridHolder");
let tools = document.querySelectorAll(".tool");

keyInput.getKeyEvents();
tool.createToolbar(tools);
biome.createBiome();
grid.createGrid(gridHolder);
icon.createIconSelector();

tool.setActive(tools[0], tools);