/* eslint-disable global-require, import/no-dynamic-require */
const p = require('./path');

module.exports = (dir, plugin) => {
  const pluginDir = p(dir, plugin);
  const pkg = require(`${pluginDir}/package`);
  const file = require.resolve(`${pluginDir}/${pkg.main || 'index.js'}`);

  return require(file);
};
