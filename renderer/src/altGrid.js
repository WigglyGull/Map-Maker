//alternative grid method
let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawGrid(){
    let ctx = canvas.getContext("2d");

    let size = 28;
    let nX = Math.floor(canvas.width / s) - 2;
    let nY = Math.floor(canvas.height / s) - 2;
    let pX = canvas.width - nX * s;
    let pY = canvas.height - nY * s;

    let paddingLeft = Math.ceil(pX / 2) - 0.5;
    let paddingTop = Math.ceil(pY / 2) - 0.5;
    let paddingRight = canvas.width - nX * size - paddingLeft;
    let paddingBottom = canvas.height - nY * size - paddingTop;

    ctx.strokeStyle = "#DADEEB";
    ctx.beginPath();

    for (var x=paddingLeft; x <= canvas.width - paddingRight; x+=size){
        ctx.moveTo(x, paddingTop);
        ctx.lineTo(x, canvas.height - paddingBottom);
        console.log("butt");
    }
    for (var y=paddingTop; y <= canvas.height - paddingBottom; y+=size){
        ctx.moveTo(paddingLeft, y);
        ctx.lineTo(canvas.width - paddingRight, y);
    }
    ctx.stroke();
}