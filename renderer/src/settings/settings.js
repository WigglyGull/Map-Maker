//Gets elements from the dom
const settingsMenu = document.querySelector(".settingsBar");
const settingsButton = document.querySelector(".settingsButton");
const settingsIcon = document.querySelector(".settingIcon");
const otherSettings = document.querySelectorAll(".otherSetting");

const restartButton = document.querySelector(".restartButtonClose");
const exitButton = document.querySelector(".exitButtonClose");

//Classes that change css to open and close the menu
const hiddenClass = "closed";
const openClass = "open";

const globalData = require("../../../src/globalData.js");
const darkMode = globalData.darkMode;

exports.setUpSettings = (loadMenu)=>{
    //make each buttons text pop up when mouse is hovering
    otherSettings.forEach(setting => {
        setting.addEventListener("mouseenter", ()=>{
            setting.childNodes[3].style.opacity = 1;
        });
        setting.addEventListener("mouseleave", ()=>{
            setting.childNodes[3].style.opacity = 0;
        });
    });

    //Functions hold logic for each button
    settings();
    restart();
    exit(loadMenu);
}

const settings =()=>{
    settingsButton.addEventListener("click", ()=>{
        this.changeSettings();
    });
}

const restart =()=>{
    //Restarts window
    restartButton.addEventListener("click", ()=>{
        window.location.reload();
    });
}

const exit =(loadMenu)=>{
    exitButton.addEventListener("click", ()=>{
        loadMenu();
    });
}

//Open and closes setting menu
exports.changeSettings = () =>{
    if(settingsMenu.classList.item(2) != null) settingsMenu.classList.remove(settingsMenu.classList.item(2));
    const currentClass = settingsMenu.classList.item(1);

    if(currentClass === hiddenClass){
        //Sets elements class to animate open
        settingsMenu.classList.replace(hiddenClass, openClass);
        otherSettings.forEach(setting=>{
            setting.classList.replace(setting.classList.item(0), `${setting.classList.item(0).slice(0, -5)}Open`);
        });
        if(darkMode === false) settingsIcon.src = "../assets/settings/SettingIcon.svg";
    } else if(currentClass === openClass){
        //Sets elements class to animate close
        settingsMenu.classList.replace(openClass, hiddenClass);
        otherSettings.forEach(setting=>{
            setting.classList.replace(setting.classList.item(0), `${setting.classList.item(0).slice(0, -4)}Close`);
        });
        if(darkMode === false) settingsIcon.src = "../assets/settings/SettingIconClosed.svg";
    }
}