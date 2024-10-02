/* eslint-disable security-node/non-literal-reg-expr */
import log from './log.js';

/**
 * Gets a list of environment variables that start with prefix.
 */
export default function getPublicEnv(prefix = '') {
  const regex = new RegExp(`^${prefix}`);
  const publicEnv = Object.keys(process.env)
    .filter(key => regex.test(key))
    .reduce(
      (env, key) => ({
        ...env,
        [key]: process.env[key],
      }),
      {}
    );

  log.event(
    `read environment variables match with '${prefix}' from process.env.`
  );

  return publicEnv;
}
