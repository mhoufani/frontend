/**
 * UTM (Urchin Tracking Module) storage implementation
 * @module utm/store
 */

import dayjs from 'dayjs';
import { LocalStorage } from '../storage';
import { Try } from '../entities';
import { UTM_NAME_STORE } from './config';
import { createUtmFromQuery, createUtmFromReferer, isSameUtm, StoreLegacySupport, type VisitData } from './rules';

/**
 * Configuration options for UTM storage
 * @interface UtmConfig
 */
interface UtmConfig {
  /** Custom name for the storage key */
  storeName?: string;
  /** Maximum number of UTM entries to store */
  maxEntries?: number;
}

/**
 * Interface defining UTM storage operations
 * @interface UtmStore
 */
interface UtmStore {
  /** Storage key name */
  _storeName: string;
  /** Maximum number of entries to keep */
  _maxEntries: number;
  /** Retrieves all stored UTM entries */
  getStore(): VisitData[];
  /** Gets the most recent UTM entry */
  getLatest(): VisitData | null;
  /** Adds a new UTM entry to storage */
  add(utm: VisitData): void;
  /** Initializes/resets the storage */
  initStore(): void;
  /** Checks if the UTM entry differs from the latest stored entry */
  isNotLatestEntry(utm: VisitData): boolean;
  /** Processes and stores UTM data from query parameters and referrer */
  handle(query: Record<string, string>, referer: string): void;
}

/**
 * Creates a UTM storage instance
 * @param {UtmConfig} config - Configuration options
 * @param {string} [config.storeName] - Custom storage key name
 * @param {number} [config.maxEntries] - Maximum entries to store
 * @returns {UtmStore} UTM storage interface
 */
export const UtmStore = ({ storeName, maxEntries }: UtmConfig = {}): UtmStore => ({
  _storeName: storeName || UTM_NAME_STORE,
  _maxEntries: maxEntries || 20,
  getStore(): VisitData[] {
    return Try(() => {
      const store = LocalStorage.get(this._storeName) as VisitData[];
      return StoreLegacySupport(store).import();
    }).fork(() => [] as VisitData[]) as VisitData[];
  },
  getLatest() {
    const store = this.getStore();
    return store[store.length - 1] ?? null;
  },
  add(utm: VisitData) {
    Try(() => {
      const store = this.getStore();
      const nextStore =
        store.length >= this._maxEntries
          ? [
              store[0], // Keep the oldest UTM entry for historical reference
              ...store.slice(
                store.length - (this._maxEntries - 2),
                store.length
              ),
            ]
          : [...store];

      nextStore.push(utm);
      LocalStorage.set(this._storeName, nextStore);
    }).fork((error: unknown) => console.error('UTM.add.error', error));
  },
  initStore() {
    LocalStorage.remove(this._storeName);
  },
  isNotLatestEntry(utm: VisitData) {
    return !isSameUtm(utm, this.getLatest());
  },
  handle(query: Record<string, string>, referer: string) {
    const utm: VisitData = {
      visitedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      utms: createUtmFromQuery(query) || createUtmFromReferer(referer),
    };
    this.isNotLatestEntry(utm) && this.add(utm);
  },
}); 