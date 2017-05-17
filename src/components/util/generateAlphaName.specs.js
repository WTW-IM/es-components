/* eslint-env jest */

import generateAlphaName from './generateAlphaName';

describe('generateAlphaName', () => {
  it('generates a 6 character string', () => {
    const result = generateAlphaName();

    expect(result.length).toBe(6);
  });

  it('generates only alpha characters', () => {
    const result = generateAlphaName();

    expect(/^[a-zA-Z]+$/.test(result)).toBe(true);
  });

  it('generates a unique string each subsequent execution', () => {
    const result1 = generateAlphaName();
    const result2 = generateAlphaName();

    expect(result1).not.toEqual(result2);
  });
});
