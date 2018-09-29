const pacote = require('pacote');
const https = require('https');
const path = require('path');
const Promise = require('bluebird');
const p = require('./path');

const agent = new https.Agent();

module.exports = (dir, plugin, version, cb) => {
  const pluginDir = p(dir, plugin);
  let mainDeps = {};

  pacote.manifest(`${plugin}@${version}`)
    .then((pkg) => {
      if (pkg.dependencies) {
        mainDeps = pkg.dependencies;
      }

      return pacote.extract(`${plugin}@${version}`, pluginDir, { agent });
    })
    .then(() => Promise.mapSeries(Object.keys(mainDeps), (dep) => {
      const spec = `${dep}@${mainDeps[dep]}`;

      return pacote.manifest(spec)
        .then(() => {
          return pacote.extract(spec, path.join(pluginDir, 'node_modules', dep), { agent });
        });
    }))
    .then(() => {
      cb();
    })
    .catch(cb);
};
