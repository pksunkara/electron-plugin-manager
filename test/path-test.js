const { assert } = require('chai');
const path = require('path');
const fs = require('fs');
const p = require('../lib/path');

describe('Retrieving plugins path', () => {
  const dir = path.join(__dirname, 'fixtures', 'list');

  it('should return path to normal plugin without scope', () => {
    assert.isTrue(fs.existsSync(p(dir, 'example')));
  });

  it('should return path to normal plugin with scope', () => {
    assert.isTrue(fs.existsSync(p(dir, '@scope/example')));
  });
});
