const { ipcRenderer } = require('electron');
const path = require('path');
const epm = require('../../lib');

const dir = path.join(__dirname, 'epm');

const install = () => {
  ipcRenderer.on('epm-installed-@dotsync/plugin-link', (event, err, pluginPath) => {
  });

  ipcRenderer.send('epm-install', dir, '@dotsync/plugin-link', 'latest');
};

const list = () => {
  return epm.list(dir);
};

const load = () => {

};

const unload = () => {

};

const uninstall = () => {

};
