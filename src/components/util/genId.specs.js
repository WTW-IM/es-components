/* eslint-env jest */

import genId from './genId';

describe('genId', () => {
  it('generates a 6 character string', () => {
    const result = genId();

    expect(result.length).toBe(6);
  });

  it('generates only alpha characters', () => {
    const result = genId();

    expect(/^[a-zA-Z]+$/.test(result)).toBe(true);
  });

  it('generates a unique string each subsequent execution', () => {
    const result1 = genId();
    const result2 = genId();

    expect(result1).not.toEqual(result2);
  });
});
