import { Try } from '../entities';
import { isBrowser } from '../checker';

/**
 * Interface for Local Storage operations
 */
export interface ILocalStorage {
  /** Checks if localStorage is available in the current environment */
  isAvailable: () => boolean,
  /** 
   * Sets a value in localStorage
   * @param key - The key to store the value under
   * @param value - The value to store
   * @returns The storage instance for chaining
   */
  set: (key: string, value: unknown) => ILocalStorage,
  /**
   * Removes an item from localStorage
   * @param key - The key to remove
   * @returns The storage instance for chaining
   */
  remove: (key: string) => ILocalStorage,
  /** 
   * Clears all items from localStorage
   * @returns The storage instance for chaining
   */
  clear: () => ILocalStorage,
  /**
   * Retrieves a value from localStorage
   * @param key - The key to retrieve
   */
  get: (key: string) => unknown,
  /**
   * Retrieves all items from localStorage
   */
  all: () => unknown
}

/**
 * LocalStorage implementation with error handling
 */
export const LocalStorage: ILocalStorage = {
  isAvailable: () => isBrowser() && hasStorageAvailable(Storage.localStorage),
  set(key, value) {
    return Try(() => {
      window.localStorage.setItem(key, JSON.stringify(value))
      return this
    }).fork((e) => {
      console.error('LocalStorage.setItem.error', e)
      return this
    }) as ILocalStorage
  },
  get(key) {
    return Try(() => JSON.parse(window.localStorage.getItem(key) || ''))
      .fork((e) => {
      console.error('LocalStorage.setItem.error', e);
    })
  },
  remove(key) {
    return Try(() => {
      window.localStorage.removeItem(key)
      return this
    }).fork((e) => {
      console.error('LocalStorage.removeItem', e)
      return this
    }) as ILocalStorage
  },
  clear: () => Try(() => {
      window.localStorage.clear()
      return this
    }).fork((e) => {
      console.error('LocalStorage.clear', e)
      return this
    }) as ILocalStorage,
  all: () => {
    return Try(() => JSON.parse(window.localStorage.all()))
      .fork((e) => {
      console.error('LocalStorage.all', e)
      return {}
    })
  },
}

/**
 * Interface for Session Storage operations
 */
export interface ISessionStorage {
  /** Checks if sessionStorage is available in the current environment */
  isAvailable: () => boolean,
  /**
   * Sets a value in sessionStorage
   * @param key - The key to store the value under
   * @param value - The value to store
   * @returns The storage instance for chaining
   */
  set: (key: string, value: unknown) => ISessionStorage,
  /**
   * Removes an item from sessionStorage
   * @param key - The key to remove
   * @returns The storage instance for chaining
   */
  remove: (key: string) => ISessionStorage,
  /**
   * Clears all items from sessionStorage
   * @returns The storage instance for chaining
   */
  clear: () => ISessionStorage,
  /**
   * Retrieves a value from sessionStorage
   * @param key - The key to retrieve
   */
  get: (key: string) => unknown,
}

/**
 * SessionStorage implementation with error handling
 */
export const SessionStorage: ISessionStorage = {
  isAvailable: () => isBrowser() && hasStorageAvailable(Storage.sessionStorage),
  set(key, value) {
    return Try(() => {
      window.sessionStorage.setItem(key, JSON.stringify(value))
      return this;
    }).fork((e) => {
      console.error('SessionStorage.setItem.error', e)
      return this;
    }) as ISessionStorage
  },
  get(key: string) {
    return Try(() => JSON.parse(window.sessionStorage.getItem(key) || '')).fork(
      (e) => {
        console.error('SessionStorage.setItem.error', e)
      }
    )
  },
  remove(key: string) {
    return Try(() => {
      window.sessionStorage.removeItem(key)
      return this;
    }).fork((e) => {
      console.error('SessionStorage.removeItem', e)
      return this;
    }) as ISessionStorage
  },
  clear() {
    return Try(() => {
      window.sessionStorage.clear()
      return this;
    }).fork((e) => {
      console.error('SessionStorage.clear', e)
      return this;
    }) as ISessionStorage
  }
}

/**
 * Enum for storage types
 * @enum {number}
 */
export enum Storage {
  "sessionStorage",
  "localStorage"
}

/**
 * Interface for generic storage operations
 */
export interface IGenericStorage {
  /**
   * Sets an item in storage
   * @param key - The key to store the value under
   * @param value - The value to store
   */
  setItem(key: string, value: unknown): void;
  /**
   * Removes an item from storage
   * @param key - The key to remove
   */
  removeItem(key: string): void;
  /** Number of items in storage */
  length: number;
}

/**
 * Checks if a specific type of storage is available and functioning
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API}
 * @param type - The type of storage to check (localStorage or sessionStorage)
 * @returns True if storage is available and working, false otherwise
 */
export function hasStorageAvailable(type: Storage) {
  const storage = window?.[type] as unknown as IGenericStorage;
  return Try(() => {
    const x = '__storage_test__'
    storage.setItem(x, x);
    storage.removeItem(x);
    return true
  }).fork(
    (e) =>
      e instanceof DOMException &&
      // everything except Firefox
      (e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      !!storage &&
      storage.length !== 0
  ) as boolean
}
