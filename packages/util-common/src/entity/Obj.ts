import { IEntity } from "./types";

export interface ObjEntity<T, O> extends IEntity<T, O> {
  removeNull: () => ObjEntity<T, O>;
  removeProperty: (k: string | string[]) => ObjEntity<T, O>;
  filter: (k: (x:[string, unknown]) => boolean) => ObjEntity<T, O>;
  removeSubRef: (k: string | string[]) => T;
  copy: () => T;
  removePropertyFromValue:  (k: string | string[]) => ObjEntity<T, O>;
  toArray: (k: (x: [string, unknown]) => unknown)  => unknown[];
  haveValue: (v: unknown) => boolean;
}

export const Obj = <T>(x: Record<string, T>): ObjEntity<Record<string, unknown>, unknown> => ({
  map: f => Obj(f(x)),
  chain: f => f(x),
  emit: () => x,
  removeNull: () => {
    const obj = { ...x };
    for (const key in obj) {
      if (obj[key] === null) {
        delete obj[key];
      }
    }
    return Obj(obj);
  },
  removeProperty: property => {
    const obj = { ...x };
    Array.isArray(property)
      ? property.forEach(p => delete obj[p])
      : delete obj[property];
    return Obj(obj);
  },
  filter: f => {
    const obj = { ...x };
    for (const key in obj) {
      if (!f([key, obj[key]])) {
        delete obj[key];
      }
    }
    return Obj(obj);
  },
  removeSubRef: () =>
    Object.entries(x).reduce(
      (a, [b, c]) => ({ [b]: c, ...a }),
      {}
    ),
  copy: () => JSON.parse(JSON.stringify(x)),
  removePropertyFromValue: property => {
    return Obj(
      Object.keys(x).reduce((acc, key) => {
        if (x[key] !== property) {
          acc[key] = x[key];
        }
        return acc;
      }, {} as Record<string, unknown>),
    );
  },
  toArray: (f = x => x) =>
    Object.entries(x).reduce(
      (a, [k, v]) => {
        a.push(f([k, v]));
        return a
      },
      [] as unknown[],
    ),
  haveValue: (v) => Object.values(x).includes(v as T),
});
