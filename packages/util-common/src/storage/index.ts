import { Try } from '../entities';
import { isBrowser } from '../checker';

export interface ILocalStorage {
  isAvailable: () => boolean,
  set: (key: string, value: unknown) => ILocalStorage,
  remove: (key: string) => ILocalStorage,
  clear: () => ILocalStorage,
  get: (key: string) => unknown,
  all: () => unknown
}

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

export interface ISessionStorage {
  isAvailable: () => boolean,
  set: (key: string, value: unknown) => ISessionStorage,
  remove: (key: string) => ISessionStorage,
  clear: () => ISessionStorage,
  get: (key: string) => unknown,
}

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

export enum Storage {
  "sessionStorage",
  "localStorage"
}

export interface IGenericStorage {
 setItem(key: string, value: unknown): void;
 removeItem(key: string): void;
 length: number;
}

// doc: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
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
