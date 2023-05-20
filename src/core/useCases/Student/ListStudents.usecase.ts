import EntityListOutput from "../../../dtos/EntityList.output";
import None from "../../../dtos/None.input";
import RepositoryFactory from "../../../gateways/repositories";
import { EntityObject } from "../../entities/Entity";
import { StudentProps } from "../../entities/Student";
import IUseCase from "../IUseCase";

export default class ListStudentUseCase
  implements IUseCase<None, EntityListOutput<EntityObject<StudentProps>>>
{
  constructor(private repositoryFactory: RepositoryFactory) {}

  execute(data: None): Promise<EntityListOutput<EntityObject<StudentProps>>> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const allStudents = await studentRepository.getAll();
        resolve({
          data: allStudents.map((student) => student.toObject()),
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
