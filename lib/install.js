const path = require('path');
const pacote = require('pacote');
const https = require('https');

module.exports = (dir, plugin, version, cb) => {
  // WINDOWS: Scoped plugin should behave like npm install
  pacote.extract(`${plugin}@${version}`, path.join(dir, 'plugins', plugin), {
    agent: new https.Agent(),
  }).then(() => {
    console.log(arguments);
    cb();
  }).catch((err) => {
    console.log(arguments);
    cb(err);
  });
};
