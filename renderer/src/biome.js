const roomItem = require("./room");
const activeClass = "activeBiome";
let activeBiome = undefined;
let hover = false;
let biomes;

const biomeSelector = document.querySelector(".biomeHolder");
const addBiome = document.querySelector(".addBiome");
const biomeBar = document.querySelector(".biomeBar");

exports.roomGrey = "#9F9F9F";
exports.roomDarkGrey = "#383838";
const roomGreen = "#14A653";
const roomDarkGreen = "#073F1F";
const roomRed = "#D42645";
const roomDarkRed = "#560029";
const roomBlue = "#3D92E1";
const roomDarkBlue = "#0D2562";
const roomYellow = "#EBC02A";
const roomDarkYellow = "#563708";
const roomPurple = "#AE41C9";
const roomDarkPurple = "#35054B";
const secretRoom = "#E5E5E5";

exports.createBiome = () => {
    biomes = document.querySelectorAll(".biome");
    if(biomes === null) throw "Biomes element not found";
    biomeSelector.remove();

    setBiomes();

    const biomeButtons = biomeSelector.querySelectorAll(".biome");
    biomeButtons.forEach(biome => {
        biome.addEventListener("click", ()=>{
            if(biome.classList.item(1) === "activated") return;

            const newBiome = document.createElement("div");
            newBiome.classList.add(biome.classList.item(0));
            newBiome.classList.add(biome.classList.item(1));
            biomeBar.insertBefore(newBiome, biomeBar.children[biomeBar.children.length - 1]);
            setBiomes();

            biome.classList.remove("biome");
            biome.classList.add("activated");
        });
    });

    addBiome.addEventListener("click", ()=>{
        if(!addBiome.contains(biomeSelector)) addBiome.appendChild(biomeSelector);
        else if(!hover) biomeSelector.remove();
    });
    biomeSelector.addEventListener("mouseenter", ()=>{
        hover = true;
    });
    biomeSelector.addEventListener("mouseleave", ()=>{
        hover = false;
        biomeSelector.remove();
    });
}

const setBiomeActive = biome => {
    if(biome.classList.contains(activeClass)) return;
    else{
        if(biome.classList.item(1) === "small") return;
        biome.classList.add(activeClass);
        activeBiome = biome.classList.item(0);
        setActive(biome, biomes);
    }
    setRoomBiome();
}

const setBiomes = () =>{
    biomes = document.querySelectorAll(".biome");
    biomes.forEach(biome => {
        biome.addEventListener("click", ()=> setBiomeActive(biome));
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
            roomItem.currentRoomColor = roomGreen;
            roomItem.currentBorderColor = roomDarkGreen;
            break;
        case "redBiome":
            roomItem.currentRoomColor = roomRed;
            roomItem.currentBorderColor = roomDarkRed;
            break;
        case "blueBiome":
            roomItem.currentRoomColor = roomBlue;
            roomItem.currentBorderColor = roomDarkBlue;
            break;
        case "yellowBiome":
            roomItem.currentRoomColor = roomYellow;
            roomItem.currentBorderColor = roomDarkYellow;
        break;
        case "purpleBiome":
            roomItem.currentRoomColor = roomPurple;
            roomItem.currentBorderColor = roomDarkPurple;
        break;
        case "secretBiome":
            roomItem.currentRoomColor = secretRoom;
            roomItem.currentBorderColor = this.roomGrey;
        break;
    }
}