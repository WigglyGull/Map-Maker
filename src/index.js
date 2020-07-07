const { app, BrowserWindow } = require("electron");
const windowStateKeeper = require("electron-window-state");

//Sets Up Window
function createWindow(){
    const _width = 1045;
    const _height = 660;

    let winState = windowStateKeeper({
        defaultWidth: _width, defaultHeight:_height
    });

    let mainWindow = new BrowserWindow({
        width: _width, height: _height,
        minWidth: _width, minHeight: _height, maxWidth: _width, maxHeight: _height,
        x: winState.x, y: winState.y,
        webPreferences: {
            nodeIntegration: true,
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