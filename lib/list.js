const path = require('path');
const fs = require('fs');

module.exports = (dir, options = {}) => {
  const withVersion = options.version || false;
  const pluginsDir = path.join(dir, 'plugins');

  if (!fs.existsSync(pluginsDir)) {
    return [];
  }

  const readVersion = (pkgFile) => {
    if (!withVersion) {
      return '';
    }

    const { version } = JSON.parse(fs.readFileSync(pkgFile, 'utf8'));

    if (!version) {
      return '';
    }

    return `@${version}`;
  };

  const contents = fs.readdirSync(pluginsDir);
  const subDirs = contents.filter((val) =>
    fs.statSync(path.join(pluginsDir, val)).isDirectory()
  );

  return subDirs.reduce((acc, val) => {
    if (val[0] !== '@') {
      const pkgFile = path.join(pluginsDir, val, 'package.json');
      return acc.concat(`${val}${readVersion(pkgFile)}`);
    }

    const valDir = path.join(pluginsDir, val);
    const scopedContents = fs.readdirSync(valDir);

    scopedContents.forEach((scopedVal) => {
      if (fs.statSync(path.join(valDir, scopedVal)).isDirectory()) {
        const pkgFile = path.join(valDir, scopedVal, 'package.json');
        acc.push(`${val}/${scopedVal}${readVersion(pkgFile)}`);
      }
    });

    return acc;
  }, []);
};
