//Gets elements from the dom
const settingsMenu = document.querySelector(".settingsBarHidden");
const settingsButton = document.querySelector(".settingsButton");
const settingsIcon = document.querySelector(".settingIcon");
const restartButton = document.querySelector(".restartButton");
const otherSettings = document.querySelectorAll(".otherSetting");

//Classes that change css to open and close the menu
const hiddenClass = "settingsBarHidden";
const openClass = "settingsBar";

exports.setUpSettings = ()=>{
    //make each buttons text pop up when mouse is hovering
    otherSettings.forEach(setting => {
        setting.addEventListener("mouseenter", ()=>{
            setting.childNodes[3].style.opacity = 1;
            console.log(setting.childNodes[3])
        });
        setting.addEventListener("mouseleave", ()=>{
            setting.childNodes[3].style.opacity = 0;
        });
    });

    //Functions hold logic for each button
    settings();
    restart();
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

//Open and closes setting menu
exports.changeSettings = () =>{
    const currentClass = settingsMenu.classList.item(0);
    if(currentClass === hiddenClass){
        settingsMenu.classList.remove(currentClass);
        settingsMenu.classList.add(openClass);
        settingsIcon.src = "../assets/settings/SettingIcon.svg";
    } else if(currentClass === openClass){
        settingsMenu.classList.remove(currentClass);
        settingsMenu.classList.add(hiddenClass);
        settingsIcon.src = "../assets/settings/SettingIconClosed.svg";
    }
}