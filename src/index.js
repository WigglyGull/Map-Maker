const { app, BrowserWindow } = require("electron");
const windowStateKeeper = require("electron-window-state");

function createWindow(){
    let winState = windowStateKeeper({
        defaultWidth: 1280, defaultHeight: 720
    });

    let mainWindow = new BrowserWindow({
        width: 1400, height: 800,
        minWidth:750, minHeight: 450,
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