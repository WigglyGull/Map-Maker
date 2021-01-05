exports.setupMapPopUp = () =>{
    const newMap = document.querySelector(".newMap");
    const menu = document.querySelector(".menu");
    const newMapPopUp = document.querySelector(".newMapPopUp");
    const startButton = document.querySelector(".start");
    const exitButton = document.querySelector(".exitButton");

    const mapWidthInput = document.querySelector(".mapWidth");
    const mapHeightInput = document.querySelector(".mapHeight");
    const nameInput = document.querySelector(".nameInput");

    const minRows = 6;
    const maxRows = 22;
    const minColumns = 6;
    const maxColumns = 14;

    let hiddenBlock = undefined;
    let whiteBorder = undefined;

    mapWidthInput.value = `16`;
    mapHeightInput.value = `10`;
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

    const setupInput = (input, min, max)=>{
        input.addEventListener("blur", ()=>{
            restrictMapSize(input, min, max);
        });
        input.onkeypress = (e)=>{
            if(!inputKeypress(e, input, min, max)) return false;
        }
        input.addEventListener("keyup", function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                restrictMapSize(input, min, max);
            }
        });
    }
    setupInput(mapWidthInput, minRows, maxRows);
    setupInput(mapHeightInput, minColumns, maxColumns);

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
        localStorage.setItem("mapWidth", mapWidthInput.value);
        localStorage.setItem("mapHeight", mapHeightInput.value);
        localStorage.setItem("restart", false);
        window.location.replace("./main.html");
    });
}