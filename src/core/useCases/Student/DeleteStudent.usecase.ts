import DefaultOperationOutput from "../../../dtos/DefaultOperation.output";
import GetEntityByIdInput from "../../../dtos/GetEntityById.input";
import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import IUseCase from "../IUseCase";

export default class DeleteStudentUseCase
  implements IUseCase<GetEntityByIdInput, DefaultOperationOutput>
{
  constructor(private repositoryFactory: RepositoryFactory) {}

  execute(data: GetEntityByIdInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const { id } = data;
        const student = await studentRepository.getById(id);
        if (!student) throw new BadRequest("Student Id does not exists!");

        const response = await studentRepository.delete(id);
        if (response) resolve({ sucess: true });
        else throw new Error("Something went wrong...");
      } catch (error) {
        reject(error);
      }
    });
  }
}
