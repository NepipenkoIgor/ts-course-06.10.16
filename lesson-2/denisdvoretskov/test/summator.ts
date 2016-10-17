import * as assert from 'assert';
import summator from '../src/func/summator';

describe('summator', () => {
  it('1 must return 1', () => {
    assert.strictEqual(summator(1), 1);
  });

  it('1, 2 must return 3', () => {
    assert.strictEqual(summator(1, 2), 3);
  });

  it('1, 2, 3 must return 6', () => {
    assert.strictEqual(summator(1, 2, 3), 6);
  });

  it("'1' must return 1", () => {
    assert.strictEqual(summator('1'), 1);
  });

  it("'1', '1' must return 2", () => {
    assert.strictEqual(summator('1', '1'), 2);
  });

  it("'1', 1, '1' must return 3", () => {
    assert.strictEqual(summator('1', 1, '1'), 3);
  });
});
