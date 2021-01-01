const mapPopUp = require("./src/menu/createNewMap");
mapPopUp.setupMapPopUp(); 

const darkModeButton = document.querySelector(".darkMode");
if(localStorage.getItem("darkMode") === null) localStorage.setItem("darkMode", false);
if(localStorage.getItem("darkMode") === "true") document.documentElement.setAttribute("data-theme", "dark");

darkModeButton.addEventListener("click", ()=>{
    if(localStorage.getItem("darkMode") === "true"){
        trans();
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("darkMode", false);
    }else if(localStorage.getItem("darkMode") === "false"){
        trans();
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("darkMode", true);
    }
    console.log(localStorage.getItem("darkMode"));
});

const trans = () =>{
    document.documentElement.classList.add("transition");
    window.setTimeout(()=>{
        document.documentElement.classList.remove("transition")
    }, 1000);
}