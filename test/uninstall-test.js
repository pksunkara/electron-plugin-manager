const { assert } = require('chai');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const uninstall = require('../lib/uninstall');

describe('Uninstalling plugin', () => {
  const dir = path.join(__dirname, 'fixtures', 'uninstall');

  before((done) => {
    rimraf(dir, done);
  });

  describe('without scope', () => {
    const pluginsPath = path.join(dir, 'plugins');
    const pluginPath = path.join(pluginsPath, 'normal');

    before((done) => {
      fs.mkdir(pluginPath, { recursive: true }, () => {
        assert.isTrue(fs.existsSync(pluginPath));
        uninstall(dir, 'normal', done);
      });
    });

    it('should delete the plugin folder only', () => {
      assert.isFalse(fs.existsSync(pluginPath));
      assert.isTrue(fs.existsSync(pluginsPath));
    });
  });

  describe('with scope', () => {
    const pluginsPath = path.join(dir, 'plugins');
    const pluginPath = path.join(pluginsPath, '@scope', 'normal');

    before((done) => {
      fs.mkdir(pluginPath, { recursive: true }, () => {
        assert.isTrue(fs.existsSync(pluginPath));
        uninstall(dir, '@scope/normal', done);
      });
    });

    it('should delete the plugin folder only', () => {
      assert.isFalse(fs.existsSync(pluginPath));
      assert.isTrue(fs.existsSync(pluginsPath));
    });
  });

  describe('with bad name', () => {
    const pluginsPath = path.join(dir, 'plugins');
    const pluginPath = path.join(pluginsPath, 'normal');

    before((done) => {
      fs.mkdir(pluginPath, { recursive: true }, () => {
        assert.isTrue(fs.existsSync(pluginPath));
        uninstall(dir, 'nirmal', done);
      });
    });

    it('should not delete any folders', () => {
      assert.isTrue(fs.existsSync(pluginPath));
      assert.isTrue(fs.existsSync(pluginsPath));
    });
  });

  // TODO: with peer dependency

  after((done) => {
    rimraf(dir, done);
  });
});
