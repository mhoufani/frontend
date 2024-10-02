/* eslint-disable turbo/no-undeclared-env-vars */
import { makeEnvPublic } from '../runtime-env';
describe('runtime-env', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  it('makeEnvPublic', () => {
    process.env.NAME = 'John';
    process.env.FIRSTNAME = 'Doe';
    makeEnvPublic({ env: ['NAME', 'FIRSTNAME'], prefix: 'PREFIX_' });
    expect(process.env).toMatchObject({
      PREFIX_NAME: 'John',
      PREFIX_FIRSTNAME: 'Doe',
    });
    makeEnvPublic({ env: 'FOO', prefix: 'PREFIX_' });
    expect(process.env.PREFIX_FOO).toBeUndefined();
  });
});
