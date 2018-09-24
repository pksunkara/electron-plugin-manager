const { assert } = require('chai');
const path = require('path');
const p = require('../lib/path');

const cwd = path.resolve(__dirname);

describe('Retrieving plugins path', () => {
  const dir = path.join(cwd, 'fixtures', 'list');

  it('should return path to normal plugin without scope', () => {
    assert.include(p(dir, 'example'), path.join(dir, 'example'));
  });

  it('should return path to normal plugin with scope', () => {
    assert.include(p(dir, '@scope/example'), path.join(dir, '@scope', 'example'));
  });
});
