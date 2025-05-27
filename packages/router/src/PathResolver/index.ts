import { compile, pathToRegexp, Key } from 'path-to-regexp';
import { Maybe, Try } from '@mp/util-common/entities';
// import { isArray } from '@mp/util-common/checker';

export interface PathResolverConfig {
  pattern: string;
  suffix: string;
  trailingSlash?: boolean;
}

interface PathResolverInternals {
  _keys: Key[];
  _keyNames: string[];
  _regex: RegExp | null;
  _compile: ((params: Record<string, string>) => string) | null;
  _trailingSlash: boolean;
}

interface PathResolverMethods {
  _mapKeyToRegexWord(regexWords: (string | undefined)[]): Record<string, string>;
  set(key: 'regex', value: RegExp): PathResolver;
  set(key: 'compile', value: (params: Record<string, string>) => string): PathResolver;
  set(key: 'keyNames', value: string[]): PathResolver;
  get(key: keyof PathResolverInternals): PathResolverInternals[keyof PathResolverInternals];
  chain<T>(f: (x: PathResolverConfig) => T): T;
  map(f: (x: PathResolverConfig) => PathResolverConfig): PathResolver;
  hasSameKeys(keys: string[]): boolean;
  hasParam(name: string): boolean;
  toParams(path: string): Record<string, string> | null;
  toPath(params: Record<string, string>): string | null;
}

export type PathResolver = PathResolverInternals & PathResolverMethods;


// Helper function to check if two arrays have the same elements
export function hasSameElements<T>(arr1: T[], arr2: T[]): boolean {
  if (arr1.length !== arr2.length) return false;
  return arr1.every(item => arr2.includes(item)) && arr2.every(item => arr1.includes(item));
}


const _PathResolver = (x: PathResolverConfig): PathResolver => ({
  _keys: [],
  _keyNames: [],
  _regex: null,
  _compile: null,
  _trailingSlash: !!x.trailingSlash,

  _mapKeyToRegexWord(regexWords: (string | undefined)[]): Record<string, string> {
    return regexWords.reduce(
      (params: Record<string, string>, word: string | undefined, i: number) =>
        Maybe(word).fork(
          () => params,
          () => {
            if (word) {
              params[this._keys[i].name] = decodeURIComponent(word);
            }
            return params;
          }
        ),
      {}
    );
  },

  set(
    key: 'regex' | 'compile' | 'keyNames',
    value: RegExp | ((params: Record<string, string>) => string) | string[]
  ): PathResolver {
    (this as any)[`_${key}`] = value;
    return this;
  },

  get(key: keyof PathResolverInternals) {
    return (this as any)[`_${key}`];
  },

  chain: <T>(f: (x: PathResolverConfig) => T): T => f(x),

  map: (f: (x: PathResolverConfig) => PathResolverConfig): PathResolver => 
    _PathResolver(f(x)),

  hasSameKeys(keys: string[]): boolean {
    return hasSameElements(this._keyNames, keys);
  },

  hasParam(name: string): boolean {
    return this._keyNames.indexOf(name) !== -1;
  },

  toParams(path: string): Record<string, string> | null {
    return Maybe(path)
      .map(x => this._regex?.exec(x))
      .map(x => x?.slice(1))
      .map(x => x ? this._mapKeyToRegexWord(x) : null)
      .fork<null, Record<string, string> | null>(
        () => null,
        x => x as Record<string, string> | null
      );
  },

  toPath(params: Record<string, string>): string | null {
    const result = Try(() => {
      if (!this._compile) return null;
      return this._compile(params);
    });
    return result.fork(
      () => {
        console.error('pathResolver: Error compiling path');
        return null;
      },
      x => x as string | null
    ) as string | null;
  },
});

const initPathResolver = (x: PathResolverConfig): PathResolver => {
  if (!x.pattern || !x.suffix) {
    throw new Error('pattern and suffix are required');
  }
  const resolver = _PathResolver(x);
  resolver._keys = [];
  const regex = pathToRegexp(x.pattern + x.suffix, resolver._keys);
  const compileFn = compile(x.pattern + x.suffix, { encode: encodeURIComponent });
  const keyNames = resolver._keys.map(k => k.name as string);
  
  return resolver
    .set('regex', regex)
    .set('compile', compileFn)
    .set('keyNames', keyNames);
};

export const PathResolver = initPathResolver; 