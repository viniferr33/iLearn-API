import IError from "./IError";

export default class Unauthorized extends Error implements IError {
  errorCode = 401;
  name: string;
  isOperational = true;
  cause?: Error | IError | undefined;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.stack = new Error(message).stack;
  }
}
