const tools = require("./tool");

const iconTool = document.querySelector(".iconTool");
const iconImage = document.querySelector(".keyIcon");
const iconSelector = document.querySelector(".iconHolder");
let pickDivs = document.querySelectorAll(".pickDiv");
let currentImgSrc = "../assets/icons/key.svg";
let hover = false;
let slectorOpactiy = 1;

const activeClass = "activePickDiv";
exports.activePickDiv;
exports.editingText = false;

exports.createIconSelector = () =>{
    iconSelector.remove();
    let fade = setInterval(fadeOut, 50);
    
    iconTool.addEventListener("click", ()=>{
        if(!iconTool.contains(iconSelector))iconTool.appendChild(iconSelector);
        else if(!hover) iconSelector.remove();
        clearInterval(fade);
        resetOpacity();

        pickDivs = document.querySelectorAll(".pickDiv");
    });
    iconSelector.addEventListener("mouseenter", ()=>{
        hover = true;
        clearInterval(fade);
        resetOpacity();
    });
    iconSelector.addEventListener("mouseleave", ()=>{
        hover = false;
        fade = setInterval(fadeOut, 50);
    });
    pickDivs.forEach(div=>{
        div.addEventListener("click", ()=>{
            if(div.classList.contains(activeClass)) return;
            else setActive(div, pickDivs);
        });
    });
}

exports.createIcon = (grid) => {
    grid.addEventListener("click", (e)=>{
        if(grid.firstChild === null || tools.activeTool !== "iconTool") return;
        if(grid.querySelector(".gridIconSingle") !== null) return;
        if(this.editingText === true){
            this.editingText = false;
            return;
        }

        const icon = document.createElement("img");
        icon.classList.add("gridIconSingle");
        
        icon.src = setNewSrc();
        grid.appendChild(icon);
    });
};

exports.closeSelector = () => {
    iconSelector.remove();
}

const setNewSrc = () => {
    const point = currentImgSrc.length - 4;
    const newString = currentImgSrc.substr(0, point) + "1.svg";
    return newString; 
}

const setActive = (currentDiv, divs)=>{
    divs.forEach(div => {
        if(div === currentDiv){
            div.classList.add(activeClass);
            this.activePickDiv = div;
            currentImgSrc = div.firstChild.src;
            iconImage.src = currentImgSrc;
            return;
        } 
        div.classList.remove(activeClass);
    });
}

const resetOpacity = () => {
    slectorOpactiy = 1;
    iconSelector.style.opacity = slectorOpactiy;
}
const fadeOut = () => {
    if(hover){
        slectorOpactiy = 1;
        return;
    } 
    slectorOpactiy -= 0.1;
    iconSelector.style.opacity = slectorOpactiy;

    if(slectorOpactiy <= 0.05){
        iconSelector.remove();
        resetOpacity();
    }
}