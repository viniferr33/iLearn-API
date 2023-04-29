import { NextFunction, Request, Response } from "express";
import ISQLService from "../../../src/infra/ISQLService";
import ValidateAccessToken from "../../../src/core/useCases/Student/validateAccessToken.usecase";
import RepositoryFactory from "../../../src/gateways/repositories";

export default class AuthHandler {
  private validateAccessToken: ValidateAccessToken;

  constructor(sqlService: ISQLService) {
    this.validateAccessToken = new ValidateAccessToken(
      new RepositoryFactory(sqlService)
    );
  }

  public handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    next();
  }
}
