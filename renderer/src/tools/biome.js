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
exports.htmlStyle = getComputedStyle(document.querySelector("html"));
exports.roomGrey = this.htmlStyle.getPropertyValue('--roomGrey');
exports.roomAltGrey = this.htmlStyle.getPropertyValue('--roomAltGrey');

let roomGreen = this.htmlStyle.getPropertyValue('--roomGreen');
let roomAltGreen = this.htmlStyle.getPropertyValue('--roomAltGreen');

let roomRed = this.htmlStyle.getPropertyValue('--roomRed');
let roomAltRed = this.htmlStyle.getPropertyValue('--roomAltRed');

let roomBlue = this.htmlStyle.getPropertyValue('--roomBlue');
let roomAltBlue = this.htmlStyle.getPropertyValue('--roomAltBlue');

let roomYellow = this.htmlStyle.getPropertyValue('--roomYellow');
let roomAltYellow = this.htmlStyle.getPropertyValue('--roomAltYellow');

let roomPurple = this.htmlStyle.getPropertyValue('--roomPurple');
let roomAltPurple = this.htmlStyle.getPropertyValue('--roomAltPurple');
let secretRoom = this.htmlStyle.getPropertyValue('--secretRoom');

exports.numOfBiomes = 2;
exports.currentBiomes = [{num: 1, background: this.roomGrey, border: this.roomAltGrey}, {num: 2, background: roomGreen, border: roomAltGreen}];
exports.loadMap = false;

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

            this.numOfBiomes++;
            
            const colours = getRoomColour(newBiome.classList.item(0));
            const biomeInfo = {
                num: this.numOfBiomes,
                background: colours[0],
                border: colours[1]
            };
            this.currentBiomes.push(biomeInfo);
            console.log(this.currentBiomes);
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

const getRoomColour = (biome) =>{
    let colours = [];
    switch(biome){
        case "normalBiome": colours = [this.roomGrey, this.roomAltGrey]; break;
        case "grassBiome": colours = [roomGreen, roomAltGreen]; break;
        case "redBiome": colours = [roomRed, roomAltRed]; break;
        case "blueBiome": colours = [roomBlue, roomAltBlue]; break;
        case "yellowBiome": colours = [roomYellow, roomAltYellow]; break;
        case "purpleBiome": colours = [roomPurple, roomAltPurple]; break;
        case "secretBiome": colours = [secretRoom, this.roomGrey]; break;
    }
    return colours;
}

exports.getClassFromColour=(colour)=>{
    let biomeClass = undefined;
    console.log(colour);
    switch (colour){
        case(this.roomGrey): biomeClass = "normalBiome"; break;
        case(this.secretRoom): biomeClass = "secretBiome"; break;
        case(roomGreen): biomeClass = "grassBiome"; break;
        case(roomRed): biomeClass = "redBiome"; break;
        case(roomBlue): biomeClass = "blueBiome"; break;
        case(roomYellow): biomeClass = "yellowBiome"; break;
        case(roomPurple): biomeClass = "purpleBiome"; break;
    }
    return biomeClass;
}

exports.setDefaultBorder = (room) =>{
    const roomColor = room.style.getPropertyValue("--room");
    switch (roomColor){
        case(this.roomGrey): room.style.setProperty("--roomBorder", this.roomAltGrey); break;
        case(this.secretRoom): room.style.setProperty("--roomBorder", this.roomAltGrey); break;
        case(roomGreen): room.style.setProperty("--roomBorder", roomAltGreen); break;
        case(roomRed): room.style.setProperty("--roomBorder", roomAltRed); break;
        case(roomBlue): room.style.setProperty("--roomBorder", roomAltBlue); break;
        case(roomYellow): room.style.setProperty("--roomBorder", roomAltYellow); break;
        case(roomPurple): room.style.setProperty("--roomBorder", roomAltPurple); break;
    }
}

//resets colours if they didnt get added the first time
exports.resetColours = ()=>{
    this.htmlStyle = getComputedStyle(document.querySelector("html"));
    this.roomGrey = this.htmlStyle.getPropertyValue('--roomGrey');
    this.roomAltGrey = this.htmlStyle.getPropertyValue('--roomAltGrey');

    roomGreen = this.htmlStyle.getPropertyValue('--roomGreen');
    roomAltGreen = this.htmlStyle.getPropertyValue('--roomAltGreen');

    roomRed = this.htmlStyle.getPropertyValue('--roomRed');
    roomAltRed = this.htmlStyle.getPropertyValue('--roomAltRed');

    roomBlue = this.htmlStyle.getPropertyValue('--roomBlue');
    roomAltBlue = this.htmlStyle.getPropertyValue('--roomAltBlue');

    roomYellow = this.htmlStyle.getPropertyValue('--roomYellow');
    roomAltYellow = this.htmlStyle.getPropertyValue('--roomAltYellow');

    roomPurple = this.htmlStyle.getPropertyValue('--roomPurple');
    roomAltPurple = this.htmlStyle.getPropertyValue('--roomAltPurple');

    secretRoom = this.htmlStyle.getPropertyValue('--secretRoom');
    console.log("set colour");
    if(this.loadMap){
        const loadedElement = localStorage.getItem("loadElement");
        const parser = new DOMParser();

        const doc = parser.parseFromString(loadedElement, 'text/html');
        const div = doc.body.firstChild;
        gridHolder.appendChild(div);

        const loadInfo = JSON.parse(localStorage.getItem("loadInfo"));
        const biomes = loadInfo.biomes;
        for (let i=0; i < biomes.length; i++) {
            if(i > 1){
                //Spawns biome
                const newBiome = document.createElement("div");
                const biomeBar = document.querySelector(".biomeBar");
                const biomeClass = biome.getClassFromColour(biomes[i].background);

                newBiome.classList.add(biomeClass);
                newBiome.classList.add("biome");
                biomeBar.insertBefore(newBiome, biomeBar.children[biomeBar.children.length - 1]);
            }
        }
    }
    if(this.roomGrey !== "") clearInterval(setColours);
}