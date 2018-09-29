const path = require('path');
const fs = require('fs');

module.exports = (dir) => {
  const pluginsDir = path.join(dir, 'plugins');

  if (!fs.existsSync(pluginsDir)) {
    return [];
  }

  const contents = fs.readdirSync(pluginsDir);
  const subDirs = contents.filter(val => fs.statSync(path.join(pluginsDir, val)).isDirectory());

  return subDirs.reduce((acc, val) => {
    if (val[0] !== '@') {
      return acc.concat(val);
    }

    const valDir = path.join(pluginsDir, val);
    const scopedContents = fs.readdirSync(valDir);

    scopedContents.forEach((scopedVal) => {
      if (fs.statSync(path.join(valDir, scopedVal)).isDirectory()) {
        acc.push(`${val}/${scopedVal}`);
      }
    });

    return acc;
  }, []);
};
