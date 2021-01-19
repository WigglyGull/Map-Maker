const biomeTool = require("../tools/biome");

const setMap = (maps)=>{ localStorage.setItem("maps", JSON.stringify(maps)); }
const getMaps = ()=>{
    if(localStorage.getItem("maps") === null) return [];
    else return JSON.parse(localStorage.getItem("maps"));
}

//spawns pop up for a visual queue when saving
const popUp = document.querySelector(".savePopup");
if(popUp !== null) popUp.remove();

let removeTimer;
const savePopup = ()=>{
    popUp.remove();
    clearTimeout(removeTimer);

    const map = document.querySelector(".mapCenterer");
    map.appendChild(popUp);
    removeTimer = setTimeout(function(){ popUp.remove(); }, 2000);
}

exports.saveMap = ()=>{
    const maps = getMaps();
    const mapGrid = document.querySelector(".gridHolder");

    const mapObj = {
        name: localStorage.getItem("mapName"),
        width: localStorage.getItem("mapWidth"),
        height: localStorage.getItem("mapHeight"),
        biomeNum: biomeTool.numOfBiomes,
        biomes: biomeTool.currentBiomes,
        mapGrid: mapGrid.outerHTML,
    }
    
    //if map is already saved, doesnt make a new save
    let alreadySaved = false;
    let mapIndex = -1;
    maps.forEach(map => {
        mapIndex++;
        if(map.name === mapObj.name) alreadySaved = true;
    });

    if(!alreadySaved) maps.push(mapObj);
    else maps[mapIndex] = mapObj;

    setMap(maps);
    savePopup();
}

exports.deleteMap = (mapName)=>{
    const maps = getMaps();
    for (let index = 0; index < maps.length; index++) {
        if(maps[index].name === mapName){
            maps.splice(index, 1);
        }
    }
    setMap(maps);
}

exports.deleteAllMaps = ()=>{
    const maps = [];
    setMap(maps);
}