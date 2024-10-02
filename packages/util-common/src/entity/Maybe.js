import { isEmpty } from '@checker';

const _Just = x => ({
  chain: f => f(x),
  map: f => Maybe(f(x)),
  fork: (_, g = x => x) => g(x),
  isJust: true,
  isNothing: false,
});

const _Maybe = () => ({
  chain: () => _Maybe(),
  map: () => _Maybe(),
  fork: (f) => f(),
  isJust: false,
  isNothing: true,
});

export const Maybe = x =>
  isEmpty(x) || x.isNothing ? _Maybe() : _Just(x);
