/* eslint-disable newline-per-chained-call, arrow-body-style, consistent-return */
const { assert } = require('chai');
const electron = require('electron');
const { Application } = require('spectron');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const pkg = path.join(__dirname, 'integration', 'epm', 'plugins', 'is-number');

describe('Integrating into Electron', () => {
  before((done) => {
    rimraf(path.join(__dirname, 'integration', 'epm'), done);
  });

  beforeEach(() => {
    this.app = new Application({
      path: electron,
      args: [path.join(__dirname, 'integration', 'main.js')],
    });

    return this.app.start();
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('opens a window', () => {
    return this.app.client.waitUntilWindowLoaded().getWindowCount().then((count) => {
      if (process.platform === 'darwin') {
        assert.equal(count, 2);
      } else {
        assert.equal(count, 1);
      }
    });
  });

  it('has the html loaded', () => {
    return this.app.client.waitUntilWindowLoaded().getTitle().then((title) => {
      assert.equal(title, 'Electron Plugin Manager Integration Test');
    });
  });

  it('can install a package', () => {
    return this.app.client.waitUntilWindowLoaded()
      .element('#btn-install').click().pause(1000)
      .element('#value').getText().then((value) => {
        assert.isTrue(fs.existsSync(pkg));
        assert.equal(value, `${JSON.stringify(pkg)}`);
      });
  });

  it('can list packages', () => {
    return this.app.client.waitUntilWindowLoaded()
      .element('#btn-list').click().pause(1000)
      .element('#value').getText().then((value) => {
        assert.equal(value, '["is-number"]');
      });
  });

  it('can load a package', () => {
    return this.app.client.waitUntilWindowLoaded()
      .element('#btn-load').click().pause(1000)
      .element('#value').getText().then((value) => {
        assert.equal(value, 'true');
      });
  });

  it('can unload a package', () => {
    return this.app.client.waitUntilWindowLoaded()
      .element('#btn-unload').click().pause(1000)
      .element('#value').getText().then((value) => {
        assert.equal(value, 'false');
      });
  });

  it('can uninstall a packages', () => {
    return this.app.client.waitUntilWindowLoaded()
      .element('#btn-uninstall').click().pause(1000)
      .element('#value').getText().then((value) => {
        assert.isFalse(fs.existsSync(pkg));
        assert.equal(value, 'null');
      });
  });
});
