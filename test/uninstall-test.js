const { assert } = require('chai');
const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const rimraf = require('rimraf');
const uninstall = require('../lib/uninstall');

const cwd = path.resolve(__dirname);

describe('Uninstalling plugin', () => {
  const dir = path.join(cwd, 'fixtures', 'uninstall');

  before((done) => {
    rimraf(dir, done);
  });

  describe('without scope', () => {
    const pluginPath = path.join(dir, 'plugins', 'normal');

    before((done) => {
      mkdirp(pluginPath, () => {
        assert.isTrue(fs.existsSync(pluginPath));
        uninstall(dir, 'normal', done);
      });
    });

    it('should delete the folder', () => {
      assert.isFalse(fs.existsSync(pluginPath));
    });
  });

  describe('with scope', () => {
    const pluginPath = path.join(dir, 'plugins', '@scope', 'normal');

    before((done) => {
      mkdirp(pluginPath, () => {
        assert.isTrue(fs.existsSync(pluginPath));
        uninstall(dir, '@scope/normal', done);
      });
    });

    it('should delete the folder', () => {
      assert.isFalse(fs.existsSync(pluginPath));
    });
  });

  // with peer dependency
});
