const { app, BrowserWindow, Menu } = require("electron");
const windowStateKeeper = require("electron-window-state");

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
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadFile('renderer/main.html');
    mainWindow.webContents.openDevTools();

    // const template = [];
    // const menu = Menu.buildFromTemplate(template);
    // Menu.setApplicationMenu(menu);

    winState.manage(mainWindow);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", ()=>{
    if (process.platform !== "darwin") app.quit();
});
app.on("activate", ()=>{
    if(BrowserWindow.getAllWindows().length === 0) createWindow();
});