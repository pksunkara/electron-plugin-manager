/* eslint-disable global-require, import/no-dynamic-require */
const p = require('./path');

module.exports = (dir, plugin, requireFn = require) => {
  const pluginDir = p(dir, plugin);
  const pkg = requireFn(`${pluginDir}/package`);
  const file = requireFn.resolve(`${pluginDir}/${pkg.main || 'index.js'}`);

  return requireFn(file);
};
