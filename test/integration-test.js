const { assert } = require('chai');
const electron = require('electron');
const { Application } = require('spectron');
const path = require('path');

describe('Integrating into Electron', () => {
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

    return true;
  });

  it('opens a window', () => {
    this.app.client.waitUntilWindowLoaded().getWindowCount().then((count) => {
      assert.equal(count, 1);
    });
  });

  it('has the html loaded', () => {
    this.app.client.waitUntilWindowLoaded().getTitle().then((title) => {
      assert.equal(title, 'Electron Plugin Manager Integration Test');
    });
  });
});
