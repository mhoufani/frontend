// chaining patterns
export { Obj } from './Obj';
export { Maybe } from './Maybe';

export type fn = (x?: unknown) => unknown;

export interface IRight {
  map: (f: fn) => IRight;
  chain: (f: fn) => unknown;
  fork: (_?:fn, g?: fn) => unknown;
}

export interface ILeft {
  map: () => ILeft;
  chain: () => ILeft;
  fork: (f?: fn) => unknown;
}

export function Right<T>(x?: T): IRight{
  return {
    map: f => Right(f(x)),
    chain: f => f(x),
    fork: (_, g = (x) => x) => g(x),
  };
}

export function Left<T>(x?: T ): ILeft {
  return {
    chain: () => Left(x),
    map: () => Left(x),
    fork: (f = ((x) => x)) => f(x),
  };
}

export function Try(f: fn): IRight | ILeft {
  try {
    return Right(f());
  } catch (e) {
    return Left(() => e);
  }
}

export function If<T>(predicate?: T | null): IRight | ILeft {
  return predicate ? Right(predicate) : Left(predicate);
}
