export const pipe =
  (...fns) =>
  args =>
    fns.reduce((arg, fn) => fn(arg), args);
