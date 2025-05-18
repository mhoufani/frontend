import { isString, isUndefined } from '@repo/util-common/checker';
import { If } from '@repo/util-common/entity';
import log from './log';

function prefixKey(key: string, prefix = '') {
  // Check if key is available in process.env.
  If(() => !isUndefined(process.env[key]))
    .map(() => {
      // Check if key is already public.
      if (key.match(new RegExp(`/^${prefix}/i`))) {
        log.warn(
          `environment variable '${key}' is already prefixed.`
        );
      }
      const prefixedKey = `${prefix}${key}`;
      process.env[prefixedKey] = process.env[key];
      log.event(
        `environment variable '${key}' prefixed to '${prefixedKey}'.`
      );
    })
    .fork(() =>
      log.warn(
        `skipped matching environment variable '${key}'. Variable not in process.env.`
      )
    );
}

/**
 * Make a private environment variable public, so that it can be accessed in the
 * browser.
 * makeEnvPublic('NAME') or makeEnvPublic(['NAME', 'FIRSTNAME']);
 */
export default function makeEnvPublic({ env, prefix = '' }: { env: string | string[],  prefix?: string}): void {
  if (isString(env)) {
    prefixKey(prefix);
  } else {
    (env as string[]).forEach(key => prefixKey(key, prefix));
  }
}
