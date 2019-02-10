/* eslint-disable no-unused-vars */
const { ipcRenderer } = require('electron');
const path = require('path');
const epm = require('../../lib');

const dir = path.join(__dirname, 'epm');

const setValue = (value) => {
  // eslint-disable-next-line no-undef
  document.querySelector('#value').innerHTML = JSON.stringify(value);
};

const install = () => {
  ipcRenderer.on('epm-installed-is-number', (event, err, pluginPath) => {
    if (err) {
      return setValue(err.message);
    }

    return setValue(pluginPath);
  });

  ipcRenderer.send('epm-install', dir, 'is-number', 'latest');
};

const list = () => {
  setValue(epm.list(dir));
};

const load = () => {

};

const unload = () => {

};

const uninstall = () => {
  epm.uninstall(dir, 'is-number', (err) => {
    if (err) {
      return setValue(err.message);
    }

    return setValue(null);
  });
};
