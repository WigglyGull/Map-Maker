const grid = require("./src/grid.js");
const tool = require("./src/tool.js");
const biome = require("./src/biome.js");
const keyInput = require("./src/keyInputs.js");

const map = document.querySelector(".map");
const gridHolder = document.querySelector(".gridHolder");
const toolBar = document.querySelector(".toolBar");
const biomeBar = document.querySelector(".biomeBar");
let tools = document.querySelectorAll(".tool");
let biomes = document.querySelectorAll(".biome");

keyInput.getKeyEvents();
tool.createToolbar(tools);
biome.createBiome(biomes);
grid.createGrid(gridHolder);

tool.setActive(tools[0], tools);