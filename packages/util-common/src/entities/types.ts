export interface IEntity<T, E extends IEntity<T, E>> {
  map: (f: (x: T) => T) => E;
  chain: <R>(f: (x: T) => R) => R;
  emit: () => T;
}