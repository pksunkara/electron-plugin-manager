const path = require('path');
const pacote = require('pacote');
const fs = require('fs');
const https = require('https');

module.exports = {
  list(dir) {
    const pluginsDir = path.join(dir, 'plugins');
    const contents = fs.readdirSync(pluginsDir);

    const subDirs = contents.filter(val => fs.statSync(path.join(pluginsDir, val)).isDirectory());

    return subDirs.reduce((acc, val) => {
      if (val[0] !== '@') {
        return acc.push(val);
      }

      const scopedContents = fs.readdirSync(path.join(pluginsDir, val));

      scopedContents.forEach(scopedVal => {
        acc.push(path.join(val, scopedVal));
      });

      return acc;
    }, []);
  },
  install(dir, plugin, version, cb) {
    // WINDOWS: Scoped plugin should behave like npm install
    pacote.extract(`${plugin}@${version}`, path.join(dir, 'plugins', plugin), {
      agent: new https.Agent(),
    }).then(() => {
      console.log(arguments);
      cb();
    });
  },
};
