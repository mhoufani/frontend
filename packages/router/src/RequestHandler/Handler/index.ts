// Types for request and response objects
export interface Request {
  url: string;
  protocol: string;
  headers: {
    host: string;
    [key: string]: string | string[] | undefined;
  };
  [key: string]: any;
}

export interface Response {
  [key: string]: any;
}

// Type for handler functions
export type HandlerFunction = (req: Request, res: Response, next: () => HandlerResult) => void;
export type NextFunction = (req: Request, res: Response) => HandlerResult;

export interface HandlerResult {
  req: Request;
  res: Response;
}

// Design pattern: chain of responsibility
export class Handler {
  private _next: NextFunction | null;
  protected _handle: ((req: Request, res: Response) => void) | null;

  constructor(fnHandler: HandlerFunction, fnCallback: NextFunction) {
    this._next = null;
    this._handle = null;
    this.setHandler(fnHandler);
    this._next = fnCallback;
  }

  setHandler(fnHandler: HandlerFunction): void {
    this._handle = (req: Request, res: Response): void => {
      fnHandler(req, res, () => {
        if (!this._next) {
          throw new Error('Next handler not provided');
        }
        return this._next(req, res);
      });
    };
  }

  setNext(handler: Handler): void {
    this._next = (req: Request, res: Response): HandlerResult => {
      if (!handler._handle) {
        throw new Error('Handler not properly initialized');
      }
      handler._handle(req, res);
      return { req, res };
    };
  }
} 