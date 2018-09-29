const path = require('path');

module.exports = (dir, plugin) => path.join(dir, 'plugins', plugin);
