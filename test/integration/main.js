const { app, BrowserWindow, ipcMain } = require('electron');
const { format } = require('url');
const path = require('path');
const epm = require('../../lib');

const dir = path.join(__dirname, 'epm');

epm.manager(ipcMain);

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({ width: 800, height: 600 });

  // and load the index.html of the app.
  win.loadURL(format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
  }));
}

app.on('ready', createWindow);
