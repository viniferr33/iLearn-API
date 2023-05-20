import GetEntityOutput from "../../../dtos/GetEntity.output";
import GetEntityByIdInput from "../../../dtos/GetEntityById.input";
import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import { EntityObject } from "../../entities/Entity";
import { StudentProps } from "../../entities/Student";
import IUseCase from "../IUseCase";

export default class GetStudentUseCase
  implements
    IUseCase<GetEntityByIdInput, GetEntityOutput<EntityObject<StudentProps>>>
{
  constructor(private repositoryFactory: RepositoryFactory) {}

  execute(
    data: GetEntityByIdInput
  ): Promise<GetEntityOutput<EntityObject<StudentProps>>> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const { id } = data;
        const student = await studentRepository.getById(id);
        if (!student) throw new BadRequest("Student Id does not exists!");

        resolve({
          data: student!.toObject(),
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
