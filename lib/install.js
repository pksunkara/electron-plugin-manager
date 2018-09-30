const pacote = require('pacote');
const https = require('https');
const path = require('path');
const Promise = require('bluebird');
const p = require('./path');

const agent = new https.Agent();

const recursion = (name, version, dir) => {
  let deps = {};

  return pacote.manifest(`${name}@${version}`)
    .then((pkg) => {
      deps = pkg.dependencies;

      return pacote.extract(`${name}@${version}`, dir, { agent });
    })
    .then(() => Promise.mapSeries(Object.keys(deps), dep => recursion(dep, deps[dep], path.join(dir, 'node_modules', dep))));
};

module.exports = (dir, name, version, cb) => {
  const pluginDir = p(dir, name);

  recursion(name, version, pluginDir)
    .then(() => {
      cb(null, pluginDir);
    })
    .catch(cb);
};
