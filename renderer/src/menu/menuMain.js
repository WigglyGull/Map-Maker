const newMap = document.querySelector(".newMap");
const menu = document.querySelector(".menu");
const newMapPopUp = document.querySelector(".newMapPopUp");
const startButton = document.querySelector(".start");
const exitButton = document.querySelector(".exitButton");

const mapWidthInput = document.querySelector(".mapWidth");
const mapHeightInput = document.querySelector(".mapHeight");
const nameInput = document.querySelector(".nameInput");

const minRows = 16;
const maxRows = 16;
const minColumns = 10;
const maxColumns = 10;

let hiddenBlock = undefined;
let whiteBorder = undefined;

mapWidthInput.value = `${minRows}`;
mapHeightInput.value = `${minColumns}`;
nameInput.value = "Map";

exitButton.addEventListener("click", ()=>{
   newMapPopUp.remove();
   hiddenBlock.remove();
});

newMapPopUp.remove();
newMap.addEventListener("click", ()=>{
    hiddenBlock = document.createElement("div");
    whiteBorder = document.createElement("div");

    hiddenBlock.classList.add("hidden");
    newMapPopUp.classList.remove("invisible");
    whiteBorder.classList.add("whiteBorder");

    menu.appendChild(hiddenBlock);
    menu.appendChild(newMapPopUp);
    whiteBorder.appendChild(whiteBorder);
});

mapWidthInput.addEventListener("blur", ()=>{
    restrictMapSize(mapWidthInput, minRows, maxRows);
});
mapWidthInput.onkeypress = (e)=>{
    if(!inputKeypress(e, mapWidthInput, minRows, maxRows)) return false;
}

mapHeightInput.addEventListener("blur", ()=>{
    restrictMapSize(mapHeightInput, minColumns, maxColumns);
});
mapHeightInput.onkeypress = (e)=>{
    if(!inputKeypress(e, mapHeightInput, minColumns, maxColumns)) return false;
}

const inputKeypress = (e, input, min, max)=>{
    //stops the "-" symblo from being typed
    if(!((e.keyCode > 95 && e.keyCode < 106)
      || (e.keyCode > 47 && e.keyCode < 58) 
      || e.keyCode == 8)) {
        return false;
    }
    //keeps number to 2 digits
    if(input.value.length > 1) return false;
    
    //restricts size if "enter" or "space" is clicked
    var ev = e || window.event;
    if(ev.charCode < 48 || ev.charCode > 57) restrictMapSize(input, min, max);
    else return true;
}

//checks if input is between the min and max
const restrictMapSize = (input, min, max) => {
    if(input.value < min) input.value = `${min}`
    else if(input.value > max) input.value = `${max}`
    else return true;
}

//loads the actual tool
startButton.addEventListener("click", ()=>{
    window.location.replace("./main.html");
});