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
import { app, ipcMain } from 'electron';
import { manager } from 'electron-plugin-manager';

const dir = path.join(app.getPath('appData'), 'Dotsync');

manager(ipcMain);
```

```js
// In renderer process
import { remote, ipcRenderer } from 'electron';

const dir = path.join(remote.app.getPath('appData'), 'Dotsync');
```

#### Install
We can install a package from NPM as plugin by:

```js
// In main process
epm.install(dir, '@dotsync/plugin-link', 'latest', (err, pluginPath) => {
  // ...
});
```

```js
// In renderer process
ipcRenderer.send('epm-install', dir, '@dotsync/plugin-link', 'latest');
// Response sent to `epm-install-${name}` channel where `name` is the plugin name
```

#### Uninstall
We can uninstall an installed plugin by:

```js
epm.uninstall(dir, '@dotsync/plugin-link', 'latest', (err) => {
  // ...
});
```

#### List
We can list all the installed plugins by:

```js
epm.list(dir); // Array of names
```

#### Load
We can load a plugin by:

```js
// In main process
epm.load(dir, '@dotsync/plugin-link'); // Loaded plugin
```

```js
// In renderer process
ipcRenderer.sendSync('epm-load', dir, '@dotsync/plugin-link'); // Loaded plugin
```

#### Unload
We can unload a plugin by:

```js
// In main process
epm.unload(dir, '@dotsync/plugin-link');
```

```js
// In renderer process
ipcRenderer.sendSync('epm-unload', dir, '@dotsync/plugin-link');
```

## License
MIT/X11

## Bug Reports
Report [here](http://github.com/pksunkara/electron-plugin-manager/issues). __Guaranteed reply within a day__.

## Contact
Pavan Kumar Sunkara (pavan.sss1991@gmail.com)

Follow me on [github](https://github.com/users/follow?target=pksunkara), [twitter](http://twitter.com/pksunkara)
