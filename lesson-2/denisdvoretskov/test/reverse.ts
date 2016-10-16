import * as assert from 'assert';
import revertLetters from '../src/func/reverse';

describe('reverse', () => {
  it('"" must return ""', () => {
    assert.strictEqual(revertLetters(''), '');
  });

  it('" " must return " "', () => {
    assert.strictEqual(revertLetters(' '), ' ');
  });

  it('" 1 " must return " 1 "', () => {
    assert.strictEqual(revertLetters(' 1 '), ' 1 ');
  });

  it('"a" must return "a"', () => {
    assert.strictEqual(revertLetters('a'), 'a');
  });

  it('"ab" must return "ba"', () => {
    assert.strictEqual(revertLetters('ab'), 'ba');
  });

  it('"a1" must return "a1"', () => {
    assert.strictEqual(revertLetters('a1'), 'a1');
  });

  it('"a1b" must return "b1a"', () => {
    assert.strictEqual(revertLetters('a1b'), 'b1a');
  });

  it('"abc" must return "cba"', () => {
    assert.strictEqual(revertLetters('abc'), 'cba');
  });

  it('"aba" must return "aba"', () => {
    assert.strictEqual(revertLetters('aba'), 'aba');
  });

  it('"s1tar3t 2 hellow" must return "t1rat3s 2 wolleh"', () => {
    assert.strictEqual(revertLetters('s1tar3t 2 hellow'), 't1rat3s 2 wolleh');
  });

  it('"s1ta$%r3t 2 hel^low" must return "t1ra$%t3s 2 wol^leh"', () => {
    assert.strictEqual(
      revertLetters('s1ta$%r3t 2 hel^low'),
      't1ra$%t3s 2 wol^leh'
    );
  });

  it('"s1tar3t 2   low5" must return "t1rat3s 2   wol5"', () => {
    assert.strictEqual(revertLetters('s1tar3t 2   low5'), 't1rat3s 2   wol5');
  });

  it('"123" must return "123"', () => {
    assert.strictEqual(revertLetters('123'), '123');
  });
});
