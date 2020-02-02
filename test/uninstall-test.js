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
    const pluginPath = path.join(dir, 'plugins', 'normal');

    before((done) => {
      fs.mkdir(pluginPath, { recursive: true }, () => {
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
      fs.mkdir(pluginPath, { recursive: true }, () => {
        assert.isTrue(fs.existsSync(pluginPath));
        uninstall(dir, '@scope/normal', done);
      });
    });

    it('should delete the folder', () => {
      assert.isFalse(fs.existsSync(pluginPath));
    });
  });

  // TODO: with peer dependency

  after((done) => {
    rimraf(dir, done);
  });
});
