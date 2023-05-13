import IError from "./IError";

export default class DatabaseError extends Error implements IError {
  errorCode = 500;
  name: string;
  isOperational = true;
  cause?: Error | IError | undefined;

  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    this.stack = new Error(message).stack;
  }
}
