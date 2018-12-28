import { Point } from './../src/basic/index';

test('point can be new when it has a paramer or not', () => {
    const pointWithoutParamer = new Point();
    const pointWithParamer = new Point(10, 10);
    expect(pointWithoutParamer.x).toBeGreaterThanOrEqual(0);
    expect(pointWithoutParamer.y).toBeLessThan(Point.range);
    expect(pointWithParamer.x).toBe(10);
    expect(pointWithParamer.y).toBe(10);
})

test('point value should between range', () => {
    const point = new Point(-10, 284);
    expect(point.x).toBe(0);
    expect(point.y).toBe(Point.range - 1);
    point.variant();
    expect(point.x).toBeGreaterThanOrEqual(0);
    expect(point.x).toBeLessThan(Point.range);
    expect(point.y).toBeGreaterThanOrEqual(0);
    expect(point.y).toBeLessThan(Point.range);
})


