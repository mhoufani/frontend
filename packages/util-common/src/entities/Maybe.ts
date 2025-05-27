export interface IMonad<T> {
  map: <U>(f: (x: T) => U) => IMonad<U>;
  chain: <U>(f: (x: T) => IMaybe<U>) => IMaybe<U>;
  fork: <L, R>(left: () => L, right: (x: T) => R) => L | R;
}

export interface IMaybe<T> extends IMonad<T> {
  readonly isJust: boolean;
  readonly isNothing: boolean;
}

const Just = <T>(x: T): IMaybe<T> => ({
  chain: <U>(f: (x: T) => IMaybe<U>) => f(x),
  map: <U>(f: (x: T) => U) => Maybe(f(x)),
  fork: <L, R>(_left: () => L, right: (x: T) => R) => right(x),
  isJust: true,
  isNothing: false,
});

const Nothing = <T>(): IMaybe<T> => ({
  chain: <U>(_: (x: T) => IMaybe<U>) => Nothing<U>(),
  map: <U>(_: (x: T) => U) => Nothing<U>(),
  fork: <L, R>(left: () => L, _: (x: T) => R) => left(),
  isJust: false,
  isNothing: true,
});

export const Maybe = <T>(x: T | null | undefined): IMaybe<T> => {
  if (x === null || x === undefined) return Nothing<T>();
  const maybeValue = x as unknown as IMaybe<T>;
  return maybeValue.isNothing ? Nothing<T>() : Just(x);
};
