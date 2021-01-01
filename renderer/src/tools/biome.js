const roomItem = require("../grid/room");
const activeClass = "activeBiome";

let activeBiome = undefined;
let hover = false;
let biomes;
let slectorOpactiy = 1;

const biomeSelector = document.querySelector(".biomeHolder");
const addBiome = document.querySelector(".addBiome");
const biomeBar = document.querySelector(".biomeBar");

//Gets colour depending of in darkmode or lightmode
let htmlStyle = getComputedStyle(document.querySelector("html"));
exports.roomGrey = htmlStyle.getPropertyValue('--roomGrey');
exports.roomAltGrey = htmlStyle.getPropertyValue('--roomAltGrey');

let roomGreen = htmlStyle.getPropertyValue('--roomGreen');
let roomAltGreen = htmlStyle.getPropertyValue('--roomAltGreen');

let roomRed = htmlStyle.getPropertyValue('--roomRed');
let roomAltRed = htmlStyle.getPropertyValue('--roomAltRed');

let roomBlue = htmlStyle.getPropertyValue('--roomBlue');
let roomAltBlue = htmlStyle.getPropertyValue('--roomAltBlue');

let roomYellow = htmlStyle.getPropertyValue('--roomYellow');
let roomAltYellow = htmlStyle.getPropertyValue('--roomAltYellow');

let roomPurple = htmlStyle.getPropertyValue('--roomPurple');
let roomAltPurple = htmlStyle.getPropertyValue('--roomAltPurple');
let secretRoom = htmlStyle.getPropertyValue('--secretRoom');

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
            roomItem.currentBorderColor = this.roomAltGrey;
            break;
        case "grassBiome": 
            roomItem.currentRoomColor = roomGreen;
            roomItem.currentBorderColor = roomAltGreen;
            break;
        case "redBiome":
            roomItem.currentRoomColor = roomRed;
            roomItem.currentBorderColor = roomAltRed;
            break;
        case "blueBiome":
            roomItem.currentRoomColor = roomBlue;
            roomItem.currentBorderColor = roomAltBlue;
            break;
        case "yellowBiome":
            roomItem.currentRoomColor = roomYellow;
            roomItem.currentBorderColor = roomAltYellow;
        break;
        case "purpleBiome":
            roomItem.currentRoomColor = roomPurple;
            roomItem.currentBorderColor = roomAltPurple;
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

exports.setDefaultBorder = (room) =>{
    const roomColor = room.style.getPropertyValue("--room");
    switch (roomColor){
        case(this.roomGrey):
            room.style.setProperty("--roomBorder", this.roomAltGrey);
            break;
        case(this.secretRoom):
            room.style.setProperty("--roomBorder", this.roomAltGrey);
            break;
        case(roomGreen):
            room.style.setProperty("--roomBorder", roomAltGreen);
            break;
        case(roomRed):
            room.style.setProperty("--roomBorder", roomAltRed);
            break;
        case(roomBlue):
            room.style.setProperty("--roomBorder", roomAltBlue);
            break;
        case(roomYellow):
            room.style.setProperty("--roomBorder", roomAltYellow);
            break;
        case(roomPurple):
            room.style.setProperty("--roomBorder", roomAltPurple);
            break;
    }
}

//resets colours if they didnt get added the first time
exports.resetColours = ()=>{
    htmlStyle = getComputedStyle(document.querySelector("html"));
    this.roomGrey = htmlStyle.getPropertyValue('--roomGrey');
    this.roomAltGrey = htmlStyle.getPropertyValue('--roomAltGrey');

    roomGreen = htmlStyle.getPropertyValue('--roomGreen');
    roomAltGreen = htmlStyle.getPropertyValue('--roomAltGreen');

    roomRed = htmlStyle.getPropertyValue('--roomRed');
    roomAltRed = htmlStyle.getPropertyValue('--roomAltRed');

    roomBlue = htmlStyle.getPropertyValue('--roomBlue');
    roomAltBlue = htmlStyle.getPropertyValue('--roomAltBlue');

    roomYellow = htmlStyle.getPropertyValue('--roomYellow');
    roomAltYellow = htmlStyle.getPropertyValue('--roomAltYellow');

    roomPurple = htmlStyle.getPropertyValue('--roomPurple');
    roomAltPurple = htmlStyle.getPropertyValue('--roomAltPurple');

    secretRoom = htmlStyle.getPropertyValue('--secretRoom');
}