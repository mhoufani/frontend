export const pipe =
  (...fns: ((x: unknown) => void)[]) =>
    (args: unknown) =>
    fns.reduce((arg, fn) => fn(arg), args);
