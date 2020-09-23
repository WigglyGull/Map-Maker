const gridItem = require("./grid");
const tools = require("./tool");

const iconTool = document.querySelector(".iconTool");
const iconImage = document.querySelector(".keyIcon");
const iconSelector = document.querySelector(".iconHolder");
let pickDivs = document.querySelectorAll(".pickDiv");
let currentImgSrc = "";

const activeClass = "activePickDiv";
exports.activePickDiv;

exports.createIconSelector = () =>{
    iconSelector.remove();
    
    iconTool.addEventListener("click", ()=>{
        iconTool.appendChild(iconSelector);
        pickDivs = document.querySelectorAll(".pickDiv");
    });
    iconSelector.addEventListener("mouseleave", ()=>{
        iconSelector.remove();
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
        if(grid.firstChild === null && tools.activeTool !== "iconTool") return;
        const room = grid.firstChild;
        const roomNum = gridItem.getRoom(room);
    });
};

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