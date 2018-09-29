const p = require('./path');

module.exports = (dir, plugin) => {
  const pluginDir = p(dir, plugin);

  Object.keys(require.cache).forEach((item) => {
    if (item.startsWith(pluginDir)) {
      delete require.cache[item];
    }
  });
};
