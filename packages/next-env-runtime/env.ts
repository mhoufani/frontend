function isBrowser():boolean {
  return Boolean(typeof window !== 'undefined' && window.__ENV);
}

/**
 * Reads all environment variables from the browser or all environment
 * variables from the server.
 */
export function allEnv(): { string: string } {
  if (isBrowser()) {
    return window.__ENV;
  }
  return process.env;
}

export function env(key: string): string | undefined {
  if (isBrowser()) {
    return window.__ENV[key];
  }

  return process.env[key];
}
