/* eslint-disable newline-per-chained-call, arrow-body-style, consistent-return */
const { assert } = require('chai');
const electron = require('electron');
const { Application } = require('spectron');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const plugins = path.join(__dirname, 'integration', 'epm', 'plugins');
const pkg = path.join(plugins, 'is-number');

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

  it('opens a window', async () => {
    await this.app.client.waitUntilWindowLoaded();
    return this.app.client.getWindowCount().then((count) => {
      assert.equal(count, 1);
    });
  });

  it('has the html loaded', async () => {
    await this.app.client.waitUntilWindowLoaded();
    return this.app.client.getTitle().then((title) => {
      assert.equal(title, 'Electron Plugin Manager Integration Test');
    });
  });

  it('can install a package', async () => {
    await this.app.client.waitUntilWindowLoaded();
    await (await this.app.client.$('#btn-install')).click();
    await this.app.client.pause(1000);

    return (await this.app.client.$('#value')).getText().then((value) => {
      assert.isTrue(fs.existsSync(pkg));
      assert.equal(value, `${JSON.stringify(pkg)}`);
    });
  });

  it('can list packages', async () => {
    await this.app.client.waitUntilWindowLoaded();
    await (await this.app.client.$('#btn-list')).click();
    await this.app.client.pause(1000);

    return (await this.app.client.$('#value')).getText().then((value) => {
      assert.equal(value, '["is-number"]');
    });
  });

  it('can list packages', async () => {
    await this.app.client.waitUntilWindowLoaded();
    await (await this.app.client.$('#btn-list-with-versions')).click();
    await this.app.client.pause(1000);

    return (await this.app.client.$('#value')).getText().then((value) => {
      assert.equal(value, '["is-number@7.0.0"]');
    });
  });

  it('can load a package', async () => {
    await this.app.client.waitUntilWindowLoaded();
    await (await this.app.client.$('#btn-load')).click();
    await this.app.client.pause(1000);

    return (await this.app.client.$('#value')).getText().then((value) => {
      assert.equal(value, 'true');
    });
  });

  it('can unload a package', async () => {
    await this.app.client.waitUntilWindowLoaded();
    await (await this.app.client.$('#btn-unload')).click();
    await this.app.client.pause(1000);

    return (await this.app.client.$('#value')).getText().then((value) => {
      assert.equal(value, 'false');
    });
  });

  it('can uninstall a packages', async () => {
    await this.app.client.waitUntilWindowLoaded();
    await (await this.app.client.$('#btn-uninstall')).click();
    await this.app.client.pause(1000);

    return (await this.app.client.$('#value')).getText().then((value) => {
      assert.isFalse(fs.existsSync(pkg));
      assert.isTrue(fs.existsSync(plugins));
      assert.equal(value, 'null');
    });
  });
});
