/* eslint-disable no-param-reassign */
const install = require('./install');
const load = require('./load');
const unload = require('./unload');

module.exports = (ipcMain) => {
  ipcMain.on('epm-install', (event, dir, name, version) => {
    install(dir, name, version, (err, pluginPath) => {
      event.sender.send(`epm-installed-${name}`, err, pluginPath);
    });
  });

  ipcMain.on('epm-load', (event, dir, name) => {
    event.returnValue = load(dir, name);
  });

  ipcMain.on('epm-unload', (event, dir, name) => {
    event.returnValue = unload(dir, name);
  });
};
