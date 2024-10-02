export const Obj = x => ({
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
      (a, [b, c]) => ({ [b]: { ...c }, ...a }),
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
      }, {})
    );
  },
  toArray: (f = x => x) =>
    Object.entries(x).reduce(
      (a, [k, v]) => a.push(f([k, v])) && a,
      []
    ),
  haveValue: v => Object.values(x).includes(v),
});
