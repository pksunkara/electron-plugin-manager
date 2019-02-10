/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const p = require('./path');

module.exports = (dir, plugin, requireFn = require) => {
  const pluginDir = p(dir, plugin);
  const pkg = requireFn(`${pluginDir}/package`);
  const file = path.resolve(`${pluginDir}/${pkg.main || 'index.js'}`);

  return requireFn(file);
};
