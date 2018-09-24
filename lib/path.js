const path = require('path');

module.exports = (dir, plugin) => {
  const scoped = plugin.split('/');
  let result = path.join(dir, scoped[0]);

  if (scoped.length === 2) {
    result = path.join(result, scoped[1]);
  }

  return result;
};
