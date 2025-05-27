import { describe, it, expect } from "@jest/globals";
import { PathResolver } from '../PathResolver';


describe('PathResolver', () => {
  it('should handle multiple path parameters', () => {
    const pathResolve = PathResolver({
      pattern: '/:category/:subcategory/:id',
      suffix: '.html'
    });

    expect(pathResolve.toParams('/cars/electric/tesla-model-3.html')).toEqual({
      category: 'cars',
      subcategory: 'electric', 
      id: 'tesla-model-3'
    });

    expect(pathResolve.toPath({
      category: 'cars',
      subcategory: 'electric',
      id: 'tesla-model-3'
    })).toEqual('/cars/electric/tesla-model-3.html');
  });

  it('should handle optional trailing slash', () => {
    const pathResolve = PathResolver({
      pattern: '/products/:id',
      suffix: '.html',
      trailingSlash: true
    });

    expect(pathResolve.toParams('/products/123.html')).toEqual({
      id: '123'
    });
  });

  it('should check if path has specific parameter', () => {
    const pathResolve = PathResolver({
      pattern: '/:category/:id',
      suffix: '.html'
    });

    expect(pathResolve.hasParam('category')).toBe(true);
    expect(pathResolve.hasParam('id')).toBe(true);
    expect(pathResolve.hasParam('nonexistent')).toBe(false);
  });

  it('should verify if resolver has same keys', () => {
    const pathResolve = PathResolver({
      pattern: '/:category/:id',
      suffix: '.html'
    });

    expect(pathResolve.hasSameKeys(['category', 'id'])).toBe(true);
    expect(pathResolve.hasSameKeys(['category'])).toBe(false);
    expect(pathResolve.hasSameKeys(['category', 'id', 'extra'])).toBe(false);
  });

  it('should handle URL encoded parameters', () => {
    const pathResolve = PathResolver({
      pattern: '/:name',
      suffix: '.html'
    });

    expect(pathResolve.toParams('/John%20Doe.html')).toEqual({
      name: 'John Doe'
    });

    expect(pathResolve.toPath({
      name: 'John Doe'
    })).toEqual('/John%20Doe.html');
  });
});
