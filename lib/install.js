const pacote = require('pacote');
const https = require('https');
const p = require('./path');

module.exports = (dir, plugin, version, cb) => {
  pacote.extract(`${plugin}@${version}`, p(dir, plugin), {
    agent: new https.Agent(),
    cache: false,
  }).then(() => {
    cb();
  }).catch(cb);
};
