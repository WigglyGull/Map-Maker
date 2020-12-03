//Gets elements from the dom
const settingsMenu = document.querySelector(".settingsBarHidden");
const settingsButton = document.querySelector(".settingsButton");
const settingsIcon = document.querySelector(".settingIcon");

//Classes that change css to open and close the menu
const hiddenClass = "settingsBarHidden";
const openClass = "settingsBar";

exports.setUpSettings = ()=>{
    //Open and closes setting menu
    settingsButton.addEventListener("click", ()=>{
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
    });
}