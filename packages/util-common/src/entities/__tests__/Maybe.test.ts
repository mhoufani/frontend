import { it, describe, expect } from "@jest/globals";
import { Maybe, IMaybe } from '../Maybe';

describe('Maybe', () => {
  describe('Just', () => {
    it('should create Just from valid value', () => {
      const maybe = Maybe(5);
      expect(maybe.isJust).toBe(true);
      expect(maybe.isNothing).toBe(false);
    });

    it('should map over Just value', () => {
      const maybe = Maybe(5);
      const result = maybe
        .map(x => x * 2)
        .fork(() => 0, x => x);
      expect(result).toBe(10);
    });

    it('should chain Just values', () => {
      const maybe = Maybe(5);
      const result = maybe
        .chain(x => Maybe(x * 2))
        .fork(() => 0, x => x);
      expect(result).toBe(10);
    });

    it('should fork to right for Just', () => {
      const maybe = Maybe(5);
      const result = maybe.fork(
        () => 'nothing',
        x => `just ${x}`
      );
      expect(result).toBe('just 5');
    });
  });

  describe('Nothing', () => {
    it('should create Nothing from null', () => {
      const maybe = Maybe<number | null>(null);
      expect(maybe.isJust).toBe(false);
      expect(maybe.isNothing).toBe(true);
    });

    it('should create Nothing from undefined', () => {
      const maybe = Maybe<number | undefined>(undefined);
      expect(maybe.isJust).toBe(false);
      expect(maybe.isNothing).toBe(true);
    });

    it('should map over Nothing', () => {
      const maybe = Maybe<number | null>(null);
      const result = maybe
        .map(x => (x !== null ? x * 2 : 0))
        .fork(() => 'nothing', x => `just ${x}`);
      expect(result).toBe('nothing');
    });

    it('should chain Nothing values', () => {
      const maybe = Maybe<number | null>(null);
      const result = maybe
        .chain(x => (x !== null ? Maybe(x * 2) : Maybe(null)))
        .fork(() => 'nothing', x => `just ${x}`);
      expect(result).toBe('nothing');
    });

    it('should fork to left for Nothing', () => {
      const maybe = Maybe<number | null>(null);
      const result = maybe.fork(
        () => 'nothing',
        x => `just ${x}`
      );
      expect(result).toBe('nothing');
    });
  });

  describe('Complex operations', () => {
    it('should handle chaining from Just to Nothing', () => {
      const maybe = Maybe(5);
      const result = maybe
        .chain(_ => Maybe<number | null>(null))
        .fork(() => 'nothing', x => `just ${x}`);
      expect(result).toBe('nothing');
    });

    it('should handle multiple maps', () => {
      const maybe = Maybe(5);
      const result = maybe
        .map(x => x * 2)
        .map(x => x + 1)
        .map(x => x.toString())
        .fork(() => 'nothing', x => x);
      expect(result).toBe('11');
    });

    it('should handle mixed map and chain operations', () => {
      const maybe = Maybe(5);
      const result = maybe
        .map(x => x * 2)
        .chain(x => Maybe(x + 1))
        .map(x => x.toString())
        .fork(() => 'nothing', x => x);
      expect(result).toBe('11');
    });

    it('should handle nested Maybes', () => {
      const innerMaybe = Maybe(5);
      const maybe = Maybe<IMaybe<number>>(innerMaybe);
      const result = maybe
        .chain(x => x)
        .fork(() => 'nothing', x => `just ${x}`);
      expect(result).toBe('just 5');
    });
  });

  describe('Type safety', () => {
    it('should maintain type safety through transformations', () => {
      const maybe = Maybe<number>(5);
      const result = maybe
        .map(x => x.toFixed(2))
        .map(x => x.length)
        .fork(() => 0, x => x);
      expect(result).toBe(4);
    });

    it('should handle optional values safely', () => {
      const obj: { value?: number } = {};
      const maybe = Maybe(obj.value);
      const result = maybe
        .map(x => x * 2)
        .fork(() => 'no value', x => `value: ${x}`);
      expect(result).toBe('no value');
    });
  });
}); 