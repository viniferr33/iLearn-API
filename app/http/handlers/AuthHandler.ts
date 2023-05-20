import { NextFunction, Request, Response } from "express";
import ISQLService from "../../../src/infra/ISQLService";
import ValidateAccessToken from "../../../src/core/useCases/Student/validateAccessToken.usecase";
import RepositoryFactory from "../../../src/gateways/repositories";
import LoginInput from "../../../src/dtos/Login.input";
import GenerateAccessTokenUseCase from "../../../src/core/useCases/Student/generateAccessToken.usecase";
import { UNGERISTERED_PATHS } from "../config";

export default class AuthHandler {
  private validateAccessToken: ValidateAccessToken;
  private generateAcessToken: GenerateAccessTokenUseCase;

  constructor(sqlService: ISQLService) {
    const repositoryFactory = new RepositoryFactory(sqlService);

    this.validateAccessToken = new ValidateAccessToken(repositoryFactory);
    this.generateAcessToken = new GenerateAccessTokenUseCase(repositoryFactory);
  }

  private checkUnregisteredPaths(path: string, method: string): boolean {
    const foundPath = UNGERISTERED_PATHS.find(
      (element) => element.path === path
    );
    return foundPath !== undefined && foundPath.method === method;
  }

  public async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { baseUrl, method } = request;
      if (this.checkUnregisteredPaths(baseUrl, method)) {
        if (request.baseUrl.endsWith("login")) {
          const data = request.body as LoginInput;
          const accessToken = await this.generateAcessToken.execute(data);
          response.json(accessToken);
        } else next();
      } else {
        const data = request.query as LoginInput;
        await this.validateAccessToken.execute(data);
        next();
      }
    } catch (error) {
      next(error);
    }
  }
}
