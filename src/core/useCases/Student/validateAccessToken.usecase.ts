import DefaultOperationOutput from "../../../dtos/DefaultOperation.output";
import LoginInput from "../../../dtos/Login.input";
import Unauthorized from "../../../errors/UnauthorizedError";
import RepositoryFactory from "../../../gateways/repositories";
import IUseCase from "../IUseCase";
import * as jwt from "jsonwebtoken";

export default class ValidateAccessTokenUseCase
  implements IUseCase<LoginInput, DefaultOperationOutput>
{
  constructor(public repositoryFactory: RepositoryFactory) {}

  private decryptToken(token: string) {
    const jwtPayload = <{ email: string; password: string }>(
      jwt.verify(token, process.env.SECRET_KEY ?? "YourSecretKey123")
    );

    return jwtPayload;
  }

  execute(data: LoginInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const { accessToken } = data;

        if (accessToken !== undefined) {
          const { email, password } = this.decryptToken(accessToken);

          const student = await studentRepository.getByEmail(email);

          if (student && student.props.password === password)
            resolve({ sucess: true });
          else throw new Unauthorized("Invalid credentials!");
        } else {
          throw new Unauthorized("Invalid credentials");
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
}
