/**
 * Adds a trailing slash to a path if it doesn't have one
 * @example
 * ```ts
 * addTrailingSlashToPath('/path') // '/path/'
 * addTrailingSlashToPath('/path/') // '/path/'
 * ```
 */
export const addTrailingSlashToPath = (path: string): string =>
  path && path.endsWith('/') ? path : `${path}/`

/**
 * Removes a trailing slash from a path if it has one
 * @example
 * ```ts
 * removeTrailingSlashFromPath('/path/') // '/path'
 * removeTrailingSlashFromPath('/path') // '/path'
 * ```
 */
export const removeTrailingSlashFromPath = (path: string): string =>
  path && path.endsWith('/') ? path.slice(0, -1) : path 