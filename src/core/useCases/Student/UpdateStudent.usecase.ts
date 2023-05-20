import UpdateEntityInput from "../../../dtos/UpdateEntity.input";
import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import { EntityObject } from "../../entities/Entity";
import { StudentProps } from "../../entities/Student";
import IUseCase from "../IUseCase";

export default class UpdateStudentUseCase
  implements
    IUseCase<
      UpdateEntityInput<EntityObject<StudentProps>>,
      EntityObject<StudentProps>
    >
{
  constructor(private repositoryFactory: RepositoryFactory) {}

  private testPassword(password: string): boolean {
    const passwordRegExp: RegExp = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.{8,})/;
    return passwordRegExp.test(password);
  }

  execute(
    data: UpdateEntityInput<EntityObject<StudentProps>>
  ): Promise<EntityObject<StudentProps>> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const { id, name, email, password, phone } = data.data;

        const student = await studentRepository.getById(id);
        if (!student) throw new BadRequest("Student Id does not exists!");

        if (email && email !== student.props.email)
          throw new BadRequest("Email cannot be modified!");

        if (name) student.props.name = name;
        if (password) {
          if (!this.testPassword(password))
            throw new BadRequest("Invalid password!");
          student.props.password = password;
        }
        if (phone) student.props.phone = phone;

        await studentRepository.update(student);
        resolve(student.toObject());
      } catch (error) {
        reject(error);
      }
    });
  }
}
