import getPublicEnv from './get-public-env.js';
import makeEnvFile from './make-env-file';

export interface IMakeEnvFilePublic {
  prefix: string;
  directory: string;
}

/**
 * Reads all environment variables that start with `prefix key` and writes
 * them to the public `__ENV.js` file. This makes them accessible under the
 * `window.__ENV` object.
 */
export default function makeEnvFilePublic({
  prefix,
  directory
}: IMakeEnvFilePublic): void {
  const publicEnv = getPublicEnv(prefix);
  makeEnvFile(publicEnv, { directory });
}
