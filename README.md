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
import { app } from 'electron';

const dir = path.join(app.getPath('appData'), 'Dotsync');
```

```js
// In renderer process
import { remote } from 'electron';

const dir = path.join(remote.app.getPath('appData'), 'Dotsync');
```

#### Install
We can install a package from NPM as plugin by:

> NOTE: This is currently available only in main process. Please use ipcRenderer and ipcMain if needed in renderer process

```js
epm.install(dir, '@dotsync/plugin-link', 'latest', (err, pluginPath) => {
  // ...
});
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
epm.load(dir, '@dotsync/plugin-link'); // Loaded plugin
```

#### Unload
We can unload a plugin by:

```js
epm.unload(dir, '@dotsync/plugin-link');
```

## License
MIT/X11

## Bug Reports
Report [here](http://github.com/pksunkara/electron-plugin-manager/issues). __Guaranteed reply within a day__.

## Contact
Pavan Kumar Sunkara (pavan.sss1991@gmail.com)

Follow me on [github](https://github.com/users/follow?target=pksunkara), [twitter](http://twitter.com/pksunkara)
