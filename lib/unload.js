const p = require('./path');

module.exports = (dir, plugin, requireFn = require) => {
  const pluginDir = p(dir, plugin);

  Object.keys(requireFn.cache).forEach((item) => {
    if (item.startsWith(pluginDir)) {
      // eslint-disable-next-line no-param-reassign
      delete requireFn.cache[item];
    }
  });
};
