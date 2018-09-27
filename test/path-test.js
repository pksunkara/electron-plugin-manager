const { assert } = require('chai');
const path = require('path');
const fs = require('fs');
const p = require('../lib/path');

const cwd = path.resolve(__dirname);

describe('Retrieving plugins path', () => {
  const dir = path.join(cwd, 'fixtures', 'list');

  it('should return path to normal plugin without scope', () => {
    assert.isTrue(fs.existsSync(p(dir, 'example')));
  });

  it('should return path to normal plugin with scope', () => {
    assert.isTrue(fs.existsSync(p(dir, '@scope/example')));
  });
});
