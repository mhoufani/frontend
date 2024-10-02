// todo: add match path on next handler
// design pattern: chain of responsibility
export class Handler {
  constructor(fnHandler, fnCallback) {
    // todo: error on next not provided
    this._next = null;
    this._handle = null;
    this.setHandler(fnHandler);
    this._next = fnCallback;
  }
  setHandler(fnHandler) {
    this._handle = (req, res) =>
      fnHandler(req, res, () => this._next(req, res));
  }

  setNext(handler) {
    this._next = (req, res) => handler._handle(req, res);
  }
}
