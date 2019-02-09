const { assert } = require('chai');
const path = require('path');
const list = require('../lib/list');

describe('Listing plugins', () => {
  const installed = list(path.join(__dirname, 'fixtures', 'list'));

  it('should work', () => {
    assert.lengthOf(installed, 4);
  });

  it('should returns installed packages without scope', () => {
    assert.include(installed, 'example');
    assert.include(installed, 'normal');
  });

  it('should not have files from top level', () => {
    assert.notInclude(installed, 'sample');
  });

  it('should returns installed packages with scope', () => {
    assert.include(installed, '@scope/example');
    assert.include(installed, '@scope/normal');
  });

  it('should not have files from scope level', () => {
    assert.notInclude(installed, '@scope/sample');
  });

  it('in a non existent directory should return empty', () => {
    assert.lengthOf(list(path.join(__dirname, 'fixtures', 'install')), 0);
  });
});
