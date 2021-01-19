const mapDisplay = document.querySelector(".savedMaps");
const trashIcon = document.querySelector(".trashIcon");
const saveSystem = require("../meta/saveSystem");

let clickedDelete = false;

exports.setupLoadmaps = () =>{
    trashIcon.remove();
    savedMaps = getMaps();
    savedMaps.forEach(map => {
        const savedMap = document.createElement("div");
        const mapName = document.createElement("p");
        const mapSize = document.createElement("p");
        const biomeHolder = document.createElement("div");
        const newTrashIcon = trashIcon.cloneNode(true);

        mapName.innerText = map.name;
        mapSize.innerText = `w${map.width}  h${map.height}`

        savedMap.classList.add("savedMap");
        savedMap.classList.add(`${map.name}`);

        mapName.classList.add("savedMapTitle");
        mapSize.classList.add("mapSizeText");
        biomeHolder.classList.add("biomes");

        mapDisplay.appendChild(savedMap);
        savedMap.appendChild(mapName);
        savedMap.appendChild(mapSize);
        savedMap.appendChild(biomeHolder);
        savedMap.appendChild(newTrashIcon);

        //deletes saved map when clicking trash
        newTrashIcon.addEventListener("click", ()=>{
            const thisMap = document.querySelector(`.${map.name}`);
            thisMap.remove(); 
            saveSystem.deleteMap(map.name);
            clickedDelete = true;
        });

        //loads saved map
        savedMap.addEventListener("click", ()=>{
            if(!clickedDelete) loadMap(map);
        });

        const biomes = map.biomes;
        for (let i=0; i < biomes.length; i++) {
            console.log(biomes[i])
            const newBiome = document.createElement("div");
            newBiome.classList.add("mapBiome");
            newBiome.style.background = biomes[i].background;
            newBiome.style.borderColor = biomes[i].border;
            console.log(newBiome.style.background)
            biomeHolder.appendChild(newBiome);
        }
    });
}

//repeating code in saveSystem.js because i was having problems requiring it
const getMaps = ()=>{
    if(localStorage.getItem("maps") === null) return [];
    else return JSON.parse(localStorage.getItem("maps"));
}

const loadMap = (map)=>{
    localStorage.setItem("mapWidth", map.width);
    localStorage.setItem("mapHeight", map.height);
    localStorage.setItem("mapName", map.name);
    localStorage.setItem("restart", false);
    localStorage.setItem("load", true);
    localStorage.setItem("loadElement", map.mapGrid);
    localStorage.setItem("loadInfo", JSON.stringify(map));
    window.location.replace("./main.html");
}