import { IEntity } from "./types";

const pick = (obj: Record<string, any>, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => keys.includes(key))
  );
};

export interface ObjEntity<T extends Record<string, unknown>> extends IEntity<T, ObjEntity<T>> {
  removeNull: () => ObjEntity<T>;
  removeProperty: (keys: string | string[]) => ObjEntity<T>;
  filter: (predicate: (entry: [string, unknown]) => boolean) => ObjEntity<T>;
  removeSubRef: () => T;
  copy: () => T;
  removePropertyFromValue: (value: unknown) => ObjEntity<T>;
  toArray: <R>(transform: (entry: [string, unknown]) => R) => R[];
  hasValue: <V>(value: V) => boolean;
  pick: (keys: string[]) => ObjEntity<T>;
}

export const Obj = <T extends Record<string, unknown>>(obj: T): ObjEntity<T> => ({
  map: f => Obj(f(obj)),
  chain: f => f(obj),
  emit: () => obj,
  removeNull: () => {
    const result = { ...obj };
    Object.entries(result).forEach(([key, value]) => {
      if (value === null) {
        delete result[key];
      }
    });
    return Obj(result as T);
  },
  removeProperty: keys => {
    const result = { ...obj };
    const keysToRemove = Array.isArray(keys) ? keys : [keys];
    keysToRemove.forEach(key => delete result[key]);
    return Obj(result as T);
  },
  filter: predicate => {
    const result = { ...obj };
    Object.entries(result).forEach(entry => {
      if (!predicate(entry)) {
        delete result[entry[0]];
      }
    });
    return Obj(result as T);
  },
  removeSubRef: () => 
    Object.entries(obj).reduce(
      (acc, [key, value]) => ({ ...acc, [key]: value }),
      {} as T
    ),
  copy: () => JSON.parse(JSON.stringify(obj)),
  removePropertyFromValue: value => {
    const result = Object.entries(obj).reduce((acc, [key, val]) => {
      if (val !== value) {
        acc[key] = val;
      }
      return acc;
    }, {} as Record<string, unknown>);
    return Obj(result as T);
  },
  toArray: transform => Object.entries(obj).map(transform),
  hasValue: value => Object.values(obj).includes(value),
  pick: keys => Obj(pick(obj, keys) as T),
});
