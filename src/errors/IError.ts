export default interface IError {
    errorCode: number;
    name: string;
    message: string;
    isOperational: boolean;
    stack?: string;
    cause?: IError | Error;
  }
  