// Urchin Tracking Module storage
import dayjs from 'dayjs';
import { LocalStorage } from '../storage/index.ts';
import { Try } from 'src/entity';

import { UTM_NAME_STORE } from './config.js';

import {
  createUtmFromQuery,
  createUtmFromReferer,
  isSameUtm,
  StoreLegacySupport,
} from './rules.js';

const _UTM = ({ storeName, storeLimit } = {}) => ({
  _storeName: storeName || UTM_NAME_STORE,
  _storeLimit: storeLimit || 20,
  getStore() {
    return Try(() => {
      const store = LocalStorage.get(this._storeName);
      // todo: remove StoreLegacySupport after utms stored user migration
      return StoreLegacySupport(store).import();
    }).fork(() => []);
  },
  getLatest() {
    const store = this.getStore();
    return store[store.length - 1] ?? null;
  },
  add(utm) {
    Try(() => {
      const store = this.getStore();
      // limit UTMs stored
      const nextStore =
        store.length >= this._storeLimit
          ? [
              store[0], // keep always the older utm on history
              ...store.slice(
                store.length - (this._storeLimit - 2),
                store.length
              ),
            ]
          : [...store];

      nextStore.push(utm);
      LocalStorage.set(this._storeName, nextStore);
    }).fork(() => console.error('UTM.add.error', e));
  },
  initStore() {
    LocalStorage.remove(this._storeName);
  },
  isNotLatestEntry(utm) {
    return !isSameUtm(utm, this.getLatest());
  },
  // this method store utm on event query or referer
  handle(query, referer) {
    const utm = {
      visitedAt: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      // todo: review with back if isMobile needed on future
      // mobile: isMobile,
      utms:
        createUtmFromQuery(query) || createUtmFromReferer(referer),
    };
    this.isNotLatestEntry(utm) && this.add(utm);
  },
});

export default _UTM;
