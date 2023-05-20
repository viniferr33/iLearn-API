import { Request, Response, NextFunction } from "express";
import Adapter, { Method } from "../Adapter";
import ISQLService from "../../../../src/infra/ISQLService";
import RepositoryFactory from "../../../../src/gateways/repositories";
import GetStudentUseCase from "../../../../src/core/useCases/Student/GetStudent.usecase";

export default class GetStudentAdapter extends Adapter<GetStudentUseCase> {
  constructor(sqlProvider: ISQLService) {
    const repositoryFactory = new RepositoryFactory(sqlProvider);
    const myUseCase = new GetStudentUseCase(repositoryFactory);
    super(myUseCase, Method.GET, "students/*");
  }

  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise(async () => {
      try {
        const id = request.path.split("/")[3];
        const result = await this.useCase.execute({ id: Number(id) });
        response.status(200).json(result.data);
      } catch (error) {
        next(error);
      }
    });
  }
}
