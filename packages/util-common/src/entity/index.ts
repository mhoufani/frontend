// chaining patterns
export { Obj } from './Obj';
export { Maybe } from './Maybe';

export type fn = (x?: unknown) => unknown;

interface IRight {
  map: (f: fn) => IRight;
  chain: (f: fn) => unknown;
  fork: (_?:never, g?: fn) => unknown;
}

interface ILeft {
  map: (f: fn) => ILeft;
  chain: (f: fn) => ILeft;
  fork: (f?: fn) => unknown;
}

export function Right(x?: unknown): IRight{
  return {
    chain: f => f(x),
    map: f => Right(f(x)),
    fork: (_, g = (x) => x) => g(x),
  };
}

export function Left(x?: unknown ): ILeft {
  return {
    chain: () => Left(x),
    map: () => Left(x),
    fork: (f = x => x) => f(x),
  };
}

export function Try(f: fn): IRight | ILeft {
  try {
    return Right(f());
  } catch (e) {
    return Left(() => e);
  }
}

export function If(fnCondition?: (x?: unknown) => boolean): IRight | ILeft {
  return fnCondition ? Right(fnCondition) : Left(fnCondition);
}
