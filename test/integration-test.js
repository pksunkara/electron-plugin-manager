/* eslint-disable newline-per-chained-call, arrow-body-style, consistent-return */
const { assert } = require('chai');
const { _electron: electron } = require('playwright');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const plugins = path.join(__dirname, 'integration', 'epm', 'plugins');
const pkg = path.join(plugins, 'is-number');

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

describe('Integrating into Electron', () => {
  let app, page;

  before((done) => {
    rimraf(path.join(__dirname, 'integration', 'epm'), done);
  });

  beforeEach(async () => {
    app = await electron.launch({ args: ['test/integration/main.js'] });
    page = await app.firstWindow();
  });

  afterEach(async () => {
    await app.close();
  });

  it('opens a window', async () => {
    assert.lengthOf(await app.windows(), 1);
  });

  it('has the html loaded', async () => {
    assert.equal(
      'Electron Plugin Manager Integration Test',
      await page.title()
    );
  });

  it('can install a package', async () => {
    await page.click('#btn-install');
    await sleep(1000);

    const value = await page.innerText('#value');

    assert.isTrue(fs.existsSync(pkg));
    assert.equal(value, `${JSON.stringify(pkg)}`);
  });

  it('can list packages', async () => {
    await page.click('#btn-list');
    await sleep(1000);

    const value = await page.innerText('#value');
    assert.equal(value, '["is-number"]');
  });

  it('can list packages with versions', async () => {
    await page.click('#btn-list-with-versions');
    await sleep(1000);

    const value = await page.innerText('#value');
    assert.equal(value, '["is-number@7.0.0"]');
  });

  it('can load a package', async () => {
    await page.click('#btn-load');
    await sleep(1000);

    const value = await page.innerText('#value');
    assert.equal(value, 'true');
  });

  it('can unload a package', async () => {
    await page.click('#btn-unload');
    await sleep(1000);

    const value = await page.innerText('#value');
    assert.equal(value, 'false');
  });

  it('can uninstall a packages', async () => {
    await page.click('#btn-uninstall');
    await sleep(1000);

    const value = await page.innerText('#value');
    assert.isFalse(fs.existsSync(pkg));
    assert.isTrue(fs.existsSync(plugins));
    assert.equal(value, 'null');
  });
});
