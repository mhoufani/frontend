import { Maybe, Right } from '@mp/util-common/entities';
import { Handler, Request, Response, HandlerResult, HandlerFunction } from './Handler';

/**
 * RequestHandler class for handling HTTP requests
 * @class RequestHandler
 */
export class RequestHandler extends Handler {
  private _handlers: Handler[];

  constructor(handlers: Handler[] = []) {
    // Initialize with a no-op handler
    super(
      (req: Request, res: Response, next: () => HandlerResult) => next(),
      (req: Request, res: Response) => ({ req, res })
    );
    this._handlers = handlers;
  }

  /**
   * Adds a handler to the request handler
   * @param handler - The handler function to add
   */
  add(handler: HandlerFunction): void {
    const _handler = new Handler(handler, (req: Request, res: Response) => ({ req, res }));
    const lastHandler = this._handlers[this._handlers.length - 1];
    if (lastHandler) {
      lastHandler.setNext(_handler);
    }
    this._handlers.push(_handler);
  }

  /**
   * Handles the request
   * @param req - The request object
   * @param res - The response object
   * @returns The request and response objects wrapped in a Maybe monad
   */
  handle(req: Request, res: Response) {
    return Maybe(!!this._handlers.length).fork(
      () => Right(req, res),
      () => {
        const firstHandler = this._handlers[0];
        if (firstHandler?._handle) {
          firstHandler._handle(req, res);
        }
        return Right(req, res);
      }
    );
  }
}

export default RequestHandler; 