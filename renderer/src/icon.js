const tools = require("./tool");

const iconTool = document.querySelector(".iconTool");
const iconImage = document.querySelector(".keyIcon");
const iconSelector = document.querySelector(".iconHolder");
let pickDivs = document.querySelectorAll(".pickDiv");
let currentImgSrc = "../assets/icons/key.svg";
let hover = false;

const activeClass = "activePickDiv";
exports.activePickDiv;
exports.editingText = false;

exports.createIconSelector = () =>{
    iconSelector.remove();
    
    iconTool.addEventListener("click", ()=>{
        if(!iconTool.contains(iconSelector))iconTool.appendChild(iconSelector);
        else if(!hover) iconSelector.remove();

        pickDivs = document.querySelectorAll(".pickDiv");
    });
    iconSelector.addEventListener("mouseenter", ()=>{
        hover = true;
    });
    iconSelector.addEventListener("mouseleave", ()=>{
        iconSelector.remove();
        hover = false;
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