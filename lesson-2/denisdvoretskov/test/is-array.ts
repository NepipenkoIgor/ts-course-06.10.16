import * as assert from 'assert';
import isInArray from '../src/func/is-array';

describe('isInArray', () => {
  describe('must return false if', () => {
    it('[]', () => {
      assert.strictEqual(isInArray([]), false);
    });

    it('[], 1', () => {
      assert.strictEqual(isInArray([], 1), false);
    });

    it('[1, 2]', () => {
      assert.strictEqual(isInArray([1, 2]), false);
    });

    it('[1, 2], 1, 2, 3', () => {
      assert.strictEqual(isInArray([1, 2], 1, 2, 3), false);
    });
  });

  describe('must return true if', () => {
    it('for numbers [1, 2], 2, 1', () => {
      assert.strictEqual(isInArray([1, 2], 2, 1), true);
    });
    it("for strings ['one', 'two'], 'two', 'one'", () => {
      assert.strictEqual(isInArray(['one', 'two'], 'two', 'one'), true);
    });
    it('true, false], false, true', () => {
      assert.strictEqual(isInArray([true, false], false, true), true);
    });
  });
});
