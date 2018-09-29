/* eslint-disable global-require, import/no-dynamic-require */
const { assert } = require('chai');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const nock = require('nock');
const install = require('../lib/install');
const load = require('../lib/load');
const unload = require('../lib/unload');

const cwd = path.resolve(__dirname);
const octet = { 'Content-Type': 'application/octet-stream' };

describe('Installing plugin', () => {
  const dir = path.join(cwd, 'fixtures', 'install');
  const pkg = path.join(cwd, 'fixtures', 'packages');

  describe('normal', () => {
    const pluginDir = path.join(dir, 'plugins', 'epmsample');
    const server = nock('https://registry.npmjs.org', { allowUnmocked: true })
      .get('/epmsample')
      .reply(200, JSON.stringify(require('./fixtures/packages/epmsample')))
      .get('/epmsample/-/epmsample-0.1.0.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, 'epmsample', '0.1.0.tgz')), octet);

    before((done) => {
      rimraf(dir, () => {
        install(dir, 'epmsample', '0.1.0', done);
      });
    });

    it('should call server', () => {
      assert.isTrue(server.isDone());
    });

    it('should install plugin', () => {
      assert.isTrue(fs.existsSync(pluginDir));
    });

    it('should work when required', () => {
      assert.deepEqual(load(dir, 'epmsample'), { name: 'epmsample@0.1.0' });
    });

    after(() => {
      unload(dir, 'epmsample');
    });
  });

  describe('with different main', () => {
    const pluginDir = path.join(dir, 'plugins', 'epmsample');
    const server = nock('https://registry.npmjs.org', { allowUnmocked: true })
      .get('/epmsample/-/epmsample-0.1.1.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, 'epmsample', '0.1.1.tgz')), octet);

    before((done) => {
      rimraf(dir, () => {
        install(dir, 'epmsample', '0.1.1', done);
      });
    });

    it('should call server', () => {
      assert.isTrue(server.isDone());
    });

    it('should install plugin', () => {
      assert.isTrue(fs.existsSync(pluginDir));
    });

    it('should work when required', () => {
      assert.deepEqual(load(dir, 'epmsample'), { name: 'epmsample@0.1.1' });
    });

    after(() => {
      unload(dir, 'epmsample');
    });
  });

  describe('with dependency', () => {
    const pluginDir = path.join(dir, 'plugins', 'epmsample');
    const server = nock('https://registry.npmjs.org', { allowUnmocked: true })
      .get('/epmdep1')
      .reply(200, JSON.stringify(require('./fixtures/packages/epmdep1')))
      .get('/epmsample/-/epmsample-0.1.2.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, 'epmsample', '0.1.2.tgz')), octet)
      .get('/epmdep1/-/epmdep1-0.1.0.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, 'epmdep1', '0.1.0.tgz')), octet);

    before((done) => {
      rimraf(dir, () => {
        install(dir, 'epmsample', '0.1.2', done);
      });
    });

    it('should call server', () => {
      assert.isTrue(server.isDone());
    });

    it('should install plugin', () => {
      assert.isTrue(fs.existsSync(pluginDir));
    });

    it('should work when required', () => {
      assert.deepEqual(load(dir, 'epmsample'), {
        name: 'epmsample@0.1.2',
        dependencies: [
          {
            name: 'epmdep1@0.1.0',
          },
        ],
      });
    });

    describe('and node_modules folder', () => {
      const nm = path.join(pluginDir, 'node_modules');

      it('should exist', () => {
        assert.isTrue(fs.existsSync(nm));
      });

      it('should have one dependency in it', () => {
        assert.lengthOf(fs.readdirSync(nm), 1);
      });
    });

    after(() => {
      unload(dir, 'epmsample');
    });
  });

  describe('with multiple dependencies', () => {
    const pluginDir = path.join(dir, 'plugins', 'epmsample');
    const server = nock('https://registry.npmjs.org', { allowUnmocked: true })
      .get('/epmdep2')
      .reply(200, JSON.stringify(require('./fixtures/packages/epmdep2')))
      .get('/epmsample/-/epmsample-0.1.3.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, 'epmsample', '0.1.3.tgz')), octet)
      .get('/epmdep1/-/epmdep1-0.1.0.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, 'epmdep1', '0.1.0.tgz')), octet)
      .get('/epmdep2/-/epmdep2-0.1.0.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, 'epmdep2', '0.1.0.tgz')), octet);

    before((done) => {
      rimraf(dir, () => {
        install(dir, 'epmsample', '0.1.3', done);
      });
    });

    it('should call server', () => {
      assert.isTrue(server.isDone());
    });

    it('should install plugin', () => {
      assert.isTrue(fs.existsSync(pluginDir));
    });

    it('should work when required', () => {
      assert.deepEqual(load(dir, 'epmsample'), {
        name: 'epmsample@0.1.3',
        dependencies: [
          {
            name: 'epmdep1@0.1.0',
          },
          {
            name: 'epmdep2@0.1.0',
          },
        ],
      });
    });

    describe('and node_modules folder', () => {
      const nm = path.join(pluginDir, 'node_modules');

      it('should exist', () => {
        assert.isTrue(fs.existsSync(nm));
      });

      it('should have one dependency in it', () => {
        assert.lengthOf(fs.readdirSync(nm), 2);
      });
    });

    after(() => {
      unload(dir, 'epmsample');
    });
  });

  describe('with scope', () => {
    const pluginDir = path.join(dir, 'plugins', '@scope', 'epmsample');
    const server = nock('https://registry.npmjs.org', { allowUnmocked: true })
      .get('/@scope%2fepmsample')
      .reply(200, JSON.stringify(require('./fixtures/packages/@scope/epmsample')))
      .get('/@scope/epmsample/-/epmsample-0.1.0.tgz')
      .reply(200, fs.readFileSync(path.join(pkg, '@scope', 'epmsample', '0.1.0.tgz')), octet);

    before((done) => {
      rimraf(dir, () => {
        install(dir, '@scope/epmsample', '0.1.0', done);
      });
    });

    it('should call server', () => {
      assert.isTrue(server.isDone());
    });

    it('should install plugin', () => {
      assert.isTrue(fs.existsSync(pluginDir));
    });

    it('should work when required', () => {
      assert.deepEqual(load(dir, '@scope/epmsample'), { name: '@scope/epmsample@0.1.0' });
    });

    after(() => {
      unload(dir, '@scope/epmsample');
    });
  });

  after((done) => {
    rimraf(dir, done);
  });
});
