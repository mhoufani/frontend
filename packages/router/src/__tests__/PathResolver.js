import { describe, it, expect } from "@jest/globals";
import { PathResolver } from '../PathResolver';

describe('PathResolve', () => {

  it('should return a path rule', () => {
    const pathResolve = PathResolver({
      pattern: ['/:test/slug'],
      suffix: ['.html'],
    });

    expect(pathResolve.toParams('/mytest/slug.html')).toEqual({
      test: 'mytest',
    });
  });

  it('should return path from params', () => {
    const pathResolve = PathResolver({
      pattern: ['/:test/slug'],
      suffix: ['.html'],
    });

    expect(pathResolve.toPath({ test: 'myparam' })).toEqual(
      '/myparam/slug.html'
    );
  });

  it('should not match', () => {
    const pathResolve = PathResolver({
      pattern: ['/:myparam/slug'],
      suffix: ['.html'],
    });
    expect(pathResolve.toPath({ car: 'test' })).toBeNull();
  });
});
