import { Color } from './../src/basic/index';

test('A Color without params rgb should in the expected range', () => {
    const color = new Color();
    expect(color.rgb.r).toBeLessThan(Color.range);
    expect(color.rgb.r).toBeGreaterThanOrEqual(0);

    expect(color.rgb.g).toBeLessThan(Color.range);
    expect(color.rgb.g).toBeGreaterThanOrEqual(0);

    expect(color.rgb.b).toBeLessThan(Color.range);
    expect(color.rgb.b).toBeGreaterThanOrEqual(0);
});
