import { Request, Response, NextFunction } from "express";
import Adapter, { Method } from "../Adapter";
import ISQLService from "../../../../src/infra/ISQLService";
import RepositoryFactory from "../../../../src/gateways/repositories";
import DeleteStudentUseCase from "../../../../src/core/useCases/Student/DeleteStudent.usecase";

export default class DeleteStudentAdapter extends Adapter<DeleteStudentUseCase> {
  constructor(sqlProvider: ISQLService) {
    const repositoryFactory = new RepositoryFactory(sqlProvider);
    const myUseCase = new DeleteStudentUseCase(repositoryFactory);
    super(myUseCase, Method.DELETE, "students/*");
  }

  handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    return new Promise(async () => {
      try {
        const id = request.path.split("/")[3];
        await this.useCase.execute({ id: Number(id) });
        response.status(202).json({ message: "deleted!" });
      } catch (error) {
        next(error);
      }
    });
  }
}
