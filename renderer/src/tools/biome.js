const roomItem = require("../grid/room");
const activeClass = "activeBiome";
let activeBiome = undefined;
let hover = false;
let biomes;
let slectorOpactiy = 1;

const biomeSelector = document.querySelector(".biomeHolder");
const addBiome = document.querySelector(".addBiome");
const biomeBar = document.querySelector(".biomeBar");

exports.roomGrey = "#9F9F9F";
exports.roomDarkGrey = "#383838";
const roomGreen = "#14A653";
const roomDarkGreen = "#073F1F";
const roomRed = "#CF3652";
const roomDarkRed = "#560029";
const roomBlue = "#3D92E1";
const roomDarkBlue = "#0D2562";
const roomYellow = "#E0BC3D";
const roomDarkYellow = "#563708";
const roomPurple = "#904fa0";
const roomDarkPurple = "#35054B";
const secretRoom = "#E5E5E5";

exports.createBiome = () => {
    let fade = setInterval(fadeOut, 50);
    biomes = document.querySelectorAll(".biome");

    if(biomes === null) throw "Biomes element not found";
    biomeSelector.classList.remove("hidden");
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
            setBiomeActive(newBiome);

            biome.classList.remove("biome");
            biome.classList.add("activated");
        });
    });

    addBiome.addEventListener("click", ()=>{
        if(!addBiome.contains(biomeSelector)) addBiome.appendChild(biomeSelector);
        else if(!hover) biomeSelector.remove();

        clearInterval(fade);
        resetOpacity();
    });
    biomeSelector.addEventListener("mouseenter", ()=>{
        hover = true;
        clearInterval(fade);
        resetOpacity();
    });
    biomeSelector.addEventListener("mouseleave", ()=>{
        hover = false;
        fade = setInterval(fadeOut, 50);
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

const resetOpacity = () => {
    slectorOpactiy = 1;
    biomeSelector.style.opacity = slectorOpactiy;
}
const fadeOut = () => {
    if(hover){
        slectorOpactiy = 1;
        return;
    } 
    slectorOpactiy -= 0.1;
    biomeSelector.style.opacity = slectorOpactiy;

    if(slectorOpactiy <= 0.05){
        biomeSelector.remove();
        resetOpacity();
    }
}