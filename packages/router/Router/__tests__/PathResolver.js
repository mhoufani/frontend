import PathResolver from '../PathResolver';

describe('PathResolve', () => {
  it('should return a path rule', () => {
    const pathResolve = PathResolver.of({
      pattern: ['/:test/voiture'],
      suffix: ['.html'],
    });

    expect(pathResolve.toParams('/occasion/voiture.html')).toEqual({
      test: 'occasion',
    });
  });
  it('should return path from params', () => {
    const pathResolve = PathResolver.of({
      pattern: ['/:test/voiture'],
      suffix: ['.html'],
    });

    expect(pathResolve.toPath({ test: 'occasion' })).toEqual(
      '/occasion/voiture.html'
    );
  });
  it('should not match', () => {
    const pathResolve = PathResolver.of({
      pattern: ['/:carState/voiture'],
      suffix: ['.html'],
    });
    expect(pathResolve.toPath({ car: 'occasion' })).toBeNull();
  });
});
