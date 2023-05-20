import { Request, Response, NextFunction } from "express";
import Adapter, { Method } from "../Adapter";
import ISQLService from "../../../../src/infra/ISQLService";
import RepositoryFactory from "../../../../src/gateways/repositories";
import { StudentProps } from "../../../../src/core/entities/Student";
import UpdateStudentUseCase from "../../../../src/core/useCases/Student/UpdateStudent.usecase";

export default class UpdateStudentAdapter extends Adapter<UpdateStudentUseCase> {
  constructor(sqlProvider: ISQLService) {
    const repositoryFactory = new RepositoryFactory(sqlProvider);
    const myUseCase = new UpdateStudentUseCase(repositoryFactory);
    super(myUseCase, Method.PUT, "students/*");
  }

  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise(async () => {
      try {
        const id = request.path.split("/")[3];
        const data = request.body as StudentProps;
        const result = await this.useCase.execute({
          data: {
            id: Number(id),
            ...data,
          },
        });
        response.status(204).json({ data: result });
      } catch (error) {
        next(error);
      }
    });
  }
}
