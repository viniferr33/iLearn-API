import { Request, Response } from "express";
import IError from "../../../src/errors/IError";

export default class ErrorHandler {
  public handle(
    err: IError | Error,
    request: Request,
    response: Response
  ): void {
    response.json({ message: err.message });
  }

  public handleNotFound(request: Request, response: Response): void {
    response.json({
      errorCode: 404,
      name: "Not found",
      message: "The URL you entered could not be found",
      isOperational: true,
    });
  }
}
