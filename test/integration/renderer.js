/* eslint-disable no-unused-vars */
const { remote, ipcRenderer } = require('electron');
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

  ipcRenderer.send('epm-install', dir, 'is-number', '7.0.0');
};

const list = () => {
  setValue(epm.list(dir));
};

const listWithVersions = () => {
  setValue(epm.list(dir, { version: true }));
};

const load = () => {
  const isNumber = epm.load(dir, 'is-number', remote.require);

  setValue(isNumber(5));
};

const unload = () => {
  ipcRenderer.send('epm-unload', dir, 'is-number');
  setValue(false);
};

const uninstall = () => {
  ipcRenderer.on('epm-uninstalled-is-number', (event, err) => {
    if (err) {
      return setValue(err.message);
    }

    return setValue(null);
  });

  ipcRenderer.send('epm-uninstall', dir, 'is-number');
};
