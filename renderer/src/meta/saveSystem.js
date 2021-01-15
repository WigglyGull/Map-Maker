const setMap = (maps)=>{
    localStorage.setItem("maps", JSON.stringify(maps));
    console.log(localStorage.getItem("maps"));
}

const getMaps = ()=>{
    if(localStorage.getItem("maps") === null) return [];
    else return JSON.parse(localStorage.getItem("maps"));
}

const popUp = document.querySelector(".savePopup");
popUp.remove();
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

    const mapObj = {
        name: localStorage.getItem("mapName"),
        width: localStorage.getItem("mapWidth"),
        height: localStorage.getItem("mapHeight"),
    }
    
    //if map is already saved, doesnt make a new save
    let alreadySaved = false;
    maps.forEach(map => {
        if(map.name === mapObj.name){
            alreadySaved = true;
            map = mapObj;
        }
    });
    if(!alreadySaved) maps.push(mapObj);

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