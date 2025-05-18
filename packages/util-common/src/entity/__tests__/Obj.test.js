import { it, describe, expect } from "@jest/globals";
import { Obj } from '../Obj.ts';

describe('Obj', () => {
  it('should be able to map', () => {
    const obj = Obj<Number>({ a: 1, b: 2 });
    expect(obj.map(x => x.a).emit()).toEqual(1);
  });
  it('should remove null', () => {
    const obj = Obj<Number>({ a: 1, b: null });
    expect(obj.removeNull().emit()).toEqual({ a: 1 });
  });
  it('should filter', () => {
    const obj = Obj<Number>({ a: 1, b: 2 });
    expect(obj.filter(x => x === 1).emit()).toEqual({ a: 1 });
  });
  it('should chain', () => {
    const obj = Obj({ a: 1, b: 2, c: null });
    expect(
      obj
        .filter(([, x]) => x === 1)
        .removeNull()
        .emit()
    ).toEqual({ a: 1 });
  });
  it('should remove property from object', () => {
    const obj = Obj({ a: 1, b: 2 });
    expect(obj.removePropertyFromValue(1).emit()).toEqual({ b: 2 });
  });
  it('should remove property', () => {
    const obj = Obj({ a: 1, b: 2 });
    expect(obj.removeProperty('a').emit()).toEqual({ b: 2 });
    expect(obj.removeProperty(['a', 'b']).emit()).toEqual({});
  });
  it('should return array', () => {
    const obj = Obj({ a: 1, b: 2 });
    expect(obj.toArray()).toEqual([
      ['a', 1],
      ['b', 2],
    ]);
    expect(obj.toArray(([, v]) => v)).toEqual([1, 2]);
  });
});
