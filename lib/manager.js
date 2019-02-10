/* eslint-disable no-param-reassign */
const install = require('./install');
const uninstall = require('./uninstall');
const unload = require('./unload');

module.exports = (ipcMain) => {
  ipcMain.on('epm-install', (event, dir, name, version) => {
    install(dir, name, version, (err, pluginPath) => {
      event.sender.send(`epm-installed-${name}`, err, pluginPath);
    });
  });

  ipcMain.on('epm-uninstall', (event, dir, name) => {
    uninstall(dir, name, (err) => {
      event.sender.send(`epm-uninstalled-${name}`, err);
    });
  });

  ipcMain.on('epm-unload', (event, dir, name) => {
    unload(dir, name);
  });
};
