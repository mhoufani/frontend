import { isEmpty } from '@checker'

export interface IMonade<T> {
  map: (f: (x: unknown) => unknown) => T
  chain: (f: (x: unknown) => unknown) => unknown
}

export interface IMaybe extends IMonade<IMaybe> {
  fork: (l: () => unknown, r: (x: unknown) => unknown) => unknown
  isJust: boolean
  isNothing: boolean
}

const _Just: (x: unknown) => IMaybe = (x) => ({
  chain: (f: (i: unknown) => unknown) => f(x),
  map: (f: (i: unknown) => unknown) => Maybe(f(x)),
  fork: (_: (x: unknown) => unknown, g = (x: unknown) => x) => g(x),
  isJust: true,
  isNothing: false,
})

const _Maybe = (): IMaybe => ({
  chain: () => _Maybe(),
  map: () => _Maybe(),
  fork: (f: () => unknown) => f(),
  isJust: false,
  isNothing: true,
})

export const Maybe = (x: unknown) =>
  isEmpty(x) || (x as IMaybe).isNothing ? _Maybe() : _Just(x)
