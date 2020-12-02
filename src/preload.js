const customTitlebar = require('custom-electron-titlebar');

//Creates Title Bar
window.addEventListener('DOMContentLoaded', () => {
    new customTitlebar.Titlebar({
        backgroundColor: customTitlebar.Color.fromHex('#383838')
    });
})