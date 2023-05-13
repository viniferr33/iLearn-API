import { Request, Response, NextFunction } from "express";
import CreateStudentUseCase from "../../../../src/core/useCases/Student/CreateStudent.usecase";
import Adapter, { Method } from "../Adapter";
import ISQLService from "../../../../src/infra/ISQLService";
import RepositoryFactory from "../../../../src/gateways/repositories";
import { StudentProps } from "../../../../src/core/entities/Student";

export default class CreateStudentAdapter extends Adapter<CreateStudentUseCase> {
  constructor(sqlProvider: ISQLService) {
    const repositoryFactory = new RepositoryFactory(sqlProvider);
    const myUseCase = new CreateStudentUseCase(repositoryFactory);
    super(myUseCase, Method.POST, "students");
  }

  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise(async () => {
      try {
        const data = request.body as StudentProps;
        const result = await this.useCase.execute({ data: data });
        response.status(201).json(result.data);
      } catch (error) {
        next(error);
      }
    });
  }
}
