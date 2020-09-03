const roomItem = require("./room");
const activeClass = "activeBiome";
let activeBiome = undefined;

exports.roomGrey = "#9F9F9F";
exports.roomDarkGrey = "#383838";
exports.roomGreen = "#14A653";
exports.roomDarkGreen = "#073F1F";

//ToDo: Make the expand button actually add more biomes

exports.createBiome = biomes => {
    if(biomes === null) throw "Biomes element not found";

    biomes.forEach(biome => {
        biome.addEventListener("click", ()=>{
            if(biome.classList.contains(activeClass)) return;
            else{
                biome.classList.add(activeClass);
                activeBiome = biome.classList.item(0);
                setActive(biome, biomes);
            }
            setRoomBiome();
        });
    });
}

const setActive = (currentBiome, biomes)=>{
    biomes.forEach(biome => {
        if(biome === currentBiome) return;
        biome.classList.remove(activeClass);
    });
    
}

const setRoomBiome = () =>{
    switch(activeBiome){
        case "normalBiome": 
            roomItem.currentRoomColor = this.roomGrey;
            roomItem.currentBorderColor = this.roomDarkGrey;
            break;
        case "grassBiome": 
            roomItem.currentRoomColor = this.roomGreen;
            roomItem.currentBorderColor = this.roomDarkGreen;
            break;
    }
}