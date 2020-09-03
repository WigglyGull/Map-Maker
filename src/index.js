const { app, BrowserWindow, Menu } = require("electron");
const windowStateKeeper = require("electron-window-state");
const path = require("path");

function createWindow(){
    //Todo: Make desgin responsive
    const _width = 1500;
    const _height = 936;

    let winState = windowStateKeeper({
        defaultWidth: _width, defaultHeight:_height
    });

    let mainWindow = new BrowserWindow({
        width: _width, height: _height,
        minWidth: _width, minHeight: _height, maxWidth:_width, maxHeight: _height,
        x: winState.x, y: winState.y,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });

    mainWindow.loadFile('renderer/main.html');
    mainWindow.webContents.openDevTools();

    winState.manage(mainWindow);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", ()=>{
    if (process.platform !== "darwin") app.quit();
});
app.on("activate", ()=>{
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
});