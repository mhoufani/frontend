import { it, describe, expect } from "@jest/globals";
import { Obj } from '../Obj';

describe('Obj', () => {
  describe('Basic operations', () => {
    it('should be able to map', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2 });
      expect(obj.map(x => ({ ...x, c: 3 })).emit()).toEqual({ a: 1, b: 2, c: 3 });
    });

    it('should chain operations', () => {
      const obj = Obj<Record<string, number | null>>({ a: 1, b: 2, c: null });
      expect(
        obj
          .filter(([, x]) => x === 1)
          .removeNull()
          .emit()
      ).toEqual({ a: 1 });
    });
  });

  describe('Property operations', () => {
    it('should remove null values', () => {
      const obj = Obj<Record<string, number | null>>({ a: 1, b: null });
      expect(obj.removeNull().emit()).toEqual({ a: 1 });
    });

    it('should remove property by key', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2 });
      expect(obj.removeProperty('a').emit()).toEqual({ b: 2 });
    });

    it('should remove multiple properties by keys', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2, c: 3 });
      expect(obj.removeProperty(['a', 'b']).emit()).toEqual({ c: 3 });
    });

    it('should remove property by value', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2 });
      expect(obj.removePropertyFromValue(1).emit()).toEqual({ b: 2 });
    });
  });

  describe('Filtering', () => {
    it('should filter by predicate', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2 });
      const result = obj
        .filter(entry => {
          const [, value] = entry;
          return typeof value === 'number' && value === 1;
        })
        .emit();
      expect(result).toEqual({ a: 1 });
    });

    it('should filter with complex predicate', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2, c: 3 });
      const result = obj
        .filter(entry => {
          const [key, value] = entry;
          return typeof value === 'number' && (key === 'a' || value > 2);
        })
        .emit();
      expect(result).toEqual({ a: 1, c: 3 });
    });
  });

  describe('Transformation', () => {
    it('should transform to array', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2 });
      expect(obj.toArray(([key, val]) => [key, val])).toEqual([
        ['a', 1],
        ['b', 2],
      ]);
    });

    it('should transform to array with custom mapping', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2 });
      expect(obj.toArray(([key, value]) => `${key}:${value}`)).toEqual(['a:1', 'b:2']);
    });

    it('should transform to array with value extraction', () => {
      const obj = Obj<Record<string, number>>({ a: 1, b: 2 });
      expect(obj.toArray(([, value]) => value)).toEqual([1, 2]);
    });
  });

  describe('Type safety', () => {
    it('should maintain type safety through transformations', () => {
      type TestObj = Record<string, string | number>;
      const obj = Obj<TestObj>({ name: 'test', value: 42 });
      const result = obj
        .map(x => ({ ...x, value: Number(x.value) * 2 }))
        .removeProperty('name')
        .emit();
      
      expect(result).toEqual({ value: 84 });
    });

    it('should handle optional properties', () => {
      type TestObj = Record<string, string | number | undefined>;
      const obj = Obj<TestObj>({ required: 'test' });
      expect(obj.emit()).toEqual({ required: 'test' });
    });
  });
}); 