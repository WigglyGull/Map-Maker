const { app, BrowserWindow, Menu } = require("electron");
const windowStateKeeper = require("electron-window-state");
const path = require("path");

function createWindow(){
    //Todo: Make desgin responsive

    //Sets windows height
    const _width = 1500;
    const _height = 936;
    let winState = windowStateKeeper({
        defaultWidth: _width, defaultHeight:_height
    });

    //Creates and opens a window and dev tools
    let mainWindow = new BrowserWindow({
        width: _width, height: _height,
        minWidth: 1440, minHeight: 950,
        x: winState.x, y: winState.y,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, "preload.js")
        }
    });
    mainWindow.loadFile('renderer/menu.html');
    mainWindow.webContents.openDevTools();

    //open link in browser not the app
    mainWindow.webContents.on('new-window', function(e, url) {
        e.preventDefault();
        require('electron').shell.openExternal(url);
    });

    //Keeps track of windows width, height, and poistion
    winState.manage(mainWindow);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", ()=>{
    if (process.platform !== "darwin") app.quit();
});
app.on("activate", ()=>{
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
});