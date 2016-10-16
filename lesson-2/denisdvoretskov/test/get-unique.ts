import assert = require('assert');
import getUnique from '../src/func/get-unique';

describe('reverse', () => {
  it('without arguments must return []', () => {
    assert.deepEqual(getUnique(), []);
  });

  it('"" must return [""]', () => {
    assert.deepEqual(getUnique(''), ['']);
  });

  it('"","" must return [""]', () => {
    assert.deepEqual(getUnique('', ''), ['']);
  });

  it('1,2,3 must return [1,2,3]', () => {
    assert.deepEqual(getUnique(1, 2, 3), [1, 2, 3]);
  });

  it('1,1,1 must return [1]', () => {
    assert.deepEqual(getUnique(1, 1, 1), [1]);
  });

  it('true, false must return [true, false]', () => {
    assert.deepEqual(getUnique(true, false), [true, false]);
  });
});
