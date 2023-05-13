import { NextFunction, Request, Response } from "express";
import IUseCase from "../../../src/core/useCases/IUseCase";
import { DTO } from "../../../src/dtos";
import ISQLService from "../../../src/infra/ISQLService";

enum Method {
  GET = "get",
  POST = "post",
  PUT = "put",
  DELETE = "delete",
}

interface IAdapterConstructor {
  new (sqlProvider: ISQLService): Adapter<IUseCase<DTO, DTO>>;
}

export default abstract class Adapter<T extends IUseCase<DTO, DTO>> {
  protected useCase: T;
  public readonly method: Method;
  public readonly path: string;

  constructor(useCase: T, method: Method, path: string) {
    this.useCase = useCase;
    this.method = method;
    this.path = path;
  }

  abstract handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
}

export { Method, IAdapterConstructor };
