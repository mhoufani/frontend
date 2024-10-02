import { Maybe, Right } from 'utils/entity';
import { Handler } from './Handler';
export class RequestHandler {
  constructor(handlers = []) {
    this._handlers = handlers;
    this._done = (req, res) => {
      return {
        req,
        res,
      };
    };
  }
  add(handler) {
    const _handler = new Handler(handler, this._done);
    this._handlers[this._handlers.length - 1]?.setNext(_handler);
    this._handlers.push(_handler);
  }

  handle(req, res) {
    return Maybe(!!this._handlers.length).fork(
      () => Right(req, res),
      () => {
        this._handlers[0]._handle(req, res);
        return Right(req, res);
      }
    );
  }
}

export default RequestHandler;
