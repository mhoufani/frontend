import { isBrowser } from "@repo/util-common/checker"

/**
 * Reads all environment variables from the browser or all environment
 * variables from the server.
 */
export function allEnv(): Record<string, unknown> {
  if (isBrowser()) {
    return window.__ENV;
  }
  return process.env;
}

export function env(key: string): unknown {
  if (isBrowser()) {
    return window.__ENV[key];
  }

  return process.env[key];
}
