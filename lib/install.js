const pacote = require('pacote');
const https = require('https');
const p = require('./path');

module.exports = (dir, plugin, version, cb) => {
  const pluginDir = p(dir, plugin);

  pacote.extract(`${plugin}@${version}`, pluginDir, {
    agent: new https.Agent(),
  }).then(() => {
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const pkg = require(`${pluginDir}/package.json`);
    console.log(pkg.dependencies);
    cb();
  }).catch(cb);
};
