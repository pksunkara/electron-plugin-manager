const list = require('./lib/list');
const install = require('./lib/install');
const uninstall = require('./lib/uninstall');
const path = require('./lib/path');
const load = require('./lib/load');
const unload = require('./lib/unload');
const manager = require('./lib/manager');

module.exports = {
  list,
  install,
  uninstall,
  path,
  load,
  unload,
  manager,
};
