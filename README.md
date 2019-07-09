# electron-plugin-manager

Plugin Manager based on NPM for Electron apps

> NOTE: Does not work with native node modules

## Installation

```
$ npm i --save electron-plugin-manager
```

## Usage

Let's assume our app name is `Dotsync`

Assuming we are storing the config data for our electron app in the %APPDATA%:

```js
// In main process
const { app, ipcMain } = require('electron');
const epm = require('electron-plugin-manager');

const dir = path.join(app.getPath('appData'), 'Dotsync');

epm.manager(ipcMain);
```

```js
// In renderer process
const { remote, ipcRenderer } = require('electron');
const epm = require('electron-plugin-manager');

const dir = path.join(remote.app.getPath('appData'), 'Dotsync');
```

#### Install
We can install a package from NPM as plugin by:

```js
// In main process
epm.install(dir, 'is-number', 'latest', (err, pluginPath) => {
  // ...
});
```

```js
// In renderer process
ipcRenderer.on('epm-installed-is-number', (event, err, pluginPath) => {
  // ...
});

ipcRenderer.send('epm-install', dir, 'is-number', 'latest');
// Response sent to `epm-installed-${name}` channel where `name` is the plugin name
```

#### Uninstall
We can uninstall an installed plugin by:

```js
// In main process
epm.uninstall(dir, 'is-number', (err) => {
  // ...
});
```

```js
// In renderer process
ipcRenderer.on('epm-uninstalled-is-number', (event, err) => {
  // ...
});

ipcRenderer.send('epm-uninstalled', dir, 'is-number');
// Response sent to `epm-uninstalled-${name}` channel where `name` is the plugin name
```

#### List
We can list all the installed plugins by:

```js
// In both process
epm.list(dir); // Array of name
```

We can list all the installed plugins along with their versions by:

```js
// In both process
epm.list(dir, { version: true }); // Array of name@version
```

#### Load
We can load a plugin by:

```js
// In main process
epm.load(dir, 'is-number'); // Loaded plugin
```

```js
// In renderer process
epm.load(dir, 'is-number', remote.require); // Loaded plugin
```

#### Unload
We can unload a plugin by:

```js
// In main process
epm.unload(dir, 'is-number');
```

```js
// In renderer process
ipcRenderer.send('epm-unload', dir, 'is-number');
```

## License
MIT/X11

## Bug Reports
Report [here](http://github.com/pksunkara/electron-plugin-manager/issues). __Guaranteed reply within a day__.

## Contact
Pavan Kumar Sunkara (pavan.sss1991@gmail.com)

Follow me on [github](https://github.com/users/follow?target=pksunkara), [twitter](http://twitter.com/pksunkara)
