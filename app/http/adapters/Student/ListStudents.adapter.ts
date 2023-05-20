import { Request, Response, NextFunction } from "express";
import Adapter, { Method } from "../Adapter";
import ISQLService from "../../../../src/infra/ISQLService";
import RepositoryFactory from "../../../../src/gateways/repositories";
import ListStudentUseCase from "../../../../src/core/useCases/Student/ListStudents.usecase";

export default class ListStudentsAdapter extends Adapter<ListStudentUseCase> {
  constructor(sqlProvider: ISQLService) {
    const repositoryFactory = new RepositoryFactory(sqlProvider);
    const myUseCase = new ListStudentUseCase(repositoryFactory);
    super(myUseCase, Method.GET, "students");
  }

  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise(async () => {
      try {
        const result = await this.useCase.execute({});
        response.status(200).json(result.data);
      } catch (error) {
        next(error);
      }
    });
  }
}
