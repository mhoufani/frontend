import getPublicEnv from './get-public-env.js';
import makeEnvFile from './make-env-file.js';

/**
 * Reads all environment variables that start with `prefix key` and writes
 * them to the public `__ENV.js` file. This makes them accessible under the
 * `window.__ENV` object.
 */
export default function makeEnvFilePublic({
  prefix,
  directory,
} = {}) {
  const publicEnv = getPublicEnv(prefix);
  makeEnvFile(publicEnv, { directory });
}
