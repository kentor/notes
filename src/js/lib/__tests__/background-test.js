import background from '../background';

describe('background util', () => {
  it('returns the same background given the same id', () => {
    const bg = background('id');
    expect(background('id')).toBe(bg);
    expect(background('id').hue).toBe(bg.hue);
    expect(background('id').pattern).toBe(bg.pattern);
  });
});
