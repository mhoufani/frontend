import { compile, pathToRegexp } from 'path-to-regexp';
import { Maybe, Try } from 'utils/entity';
import { arrayDiff } from 'utils/checkers';

// Entity Monad
const _PathResolver = x => ({
  _keys: [],
  _keyNames: [],
  _regex: null,
  _compile: null,
  // need to match specific on trailingSlash active
  _trailingSlash: !!x.trailingSlash,
  _mapKeyToRegexWord(regexWords) {
    return regexWords.reduce(
      (params, word, i) =>
        Maybe(word).fork(
          () => params,
          () => {
            params[this._keys[i].name] = decodeURIComponent(word);
            return params;
          }
        ),
      {}
    );
  },
  set(key, fnOrValue) {
    this[`_${key}`] =
      fnOrValue instanceof Function ? fnOrValue(this) : fnOrValue;
    return this;
  },
  get(key) {
    return this[`_${key}`];
  },
  chain: f => f(x),
  map: f => _PathResolver(f(x)),
  hasSameKeys(keys) {
    return arrayDiff(this._keyNames, keys).length === 0;
  },
  hasParam(name) {
    return this._keyNames.indexOf(name) !== -1;
  },
  toParams(path) {
    return Maybe(path)
      .map(x => this._regex.exec(x))
      .map(x => x.slice(1))
      .map(x => this._mapKeyToRegexWord(x))
      .fork(
        () => null,
        x => x
      );
  },
  toPath(params) {
    return Try(() => this._compile(params)).fork(
      e => {
        console.error('pathResolver: ', e.message);
        return null;
      },
      x => x
    );
  },
});

export default {
  of: x =>
    _PathResolver(x)
      .set('regex', pathRule =>
        pathToRegexp(x.pattern + x.suffix, pathRule._keys)
      )
      .set('compile', () =>
        compile(x.pattern + x.suffix, {
          encode: encodeURIComponent,
        })
      )
      .set('keyNames', pathRule => pathRule._keys.map(x => x.name)),
};
