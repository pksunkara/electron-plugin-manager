const rimraf = require('rimraf');
const path = require('./path');

module.exports = (dir, plugin, cb) => {
  rimraf(path(dir, plugin), cb);
};
