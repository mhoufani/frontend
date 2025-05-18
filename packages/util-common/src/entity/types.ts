export interface IEntity<T, O> {
  map: (f: (x: T) => T) => IEntity<T, O>;
  chain: (f: (x: T) => unknown) => O;
  emit: () => T
}