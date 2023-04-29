import CreateEntityInput from "../../../dtos/CreateEntity.input";
import GetEntityOutput from "../../../dtos/GetEntity.output";
import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import { EntityObject } from "../../../infra/ISQLService";
import Student, { StudentProps } from "../../entities/Student";
import IUseCase from "../IUseCase";

export default class CreateStudentUseCase
  implements
    IUseCase<
      CreateEntityInput<StudentProps>,
      GetEntityOutput<EntityObject<StudentProps>>
    >
{
  private testEmail(email: string): boolean {
    const emailRegExp: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegExp.test(email);
  }

  private testPassword(password: string): boolean {
    const passwordRegExp: RegExp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
    return passwordRegExp.test(password);
  }

  constructor(private repositoryFactory: RepositoryFactory) {}

  execute(
    data: CreateEntityInput<StudentProps>
  ): Promise<GetEntityOutput<EntityObject<StudentProps>>> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const { email, password } = data.data;

        if (!this.testEmail(email)) throw new BadRequest("Invalid email!");

        if (!this.testPassword(password))
          throw new BadRequest("Invalid password!");

        const studentExists = await studentRepository.getByEmail(email);
        if (studentExists)
          throw new BadRequest("Student email already exists!");

        const studentId = await studentRepository.create(
          Student.create(data.data)
        );

        const createdStudent = await studentRepository.getById(
          studentId.valueOf()
        );

        if (!createdStudent) throw new Error("Something went wrong...");

        resolve({ data: createdStudent!.toObject() });
      } catch (error) {
        reject(error);
      }
    });
  }
}
