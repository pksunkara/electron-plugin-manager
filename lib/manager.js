/* eslint-disable no-param-reassign */
const install = require('./install');

module.exports = (ipcMain) => {
  ipcMain.on('epm-install', (event, dir, name, version) => {
    install(dir, name, version, (err, pluginPath) => {
      event.sender.send(`epm-installed-${name}`, err, pluginPath);
    });
  });
};
