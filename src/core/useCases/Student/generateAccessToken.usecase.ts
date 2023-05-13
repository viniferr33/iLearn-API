import LoginInput from "../../../dtos/Login.input";
import LoginOutput from "../../../dtos/Login.output";
import Unauthorized from "../../../errors/UnauthorizedError";
import RepositoryFactory from "../../../gateways/repositories";
import IUseCase from "../IUseCase";
import * as CryptoJS from "crypto-js";

export default class GenerateAccessTokenUseCase
  implements IUseCase<LoginInput, LoginOutput>
{
  constructor(public repositoryFactory: RepositoryFactory) {}

  private encryptToken(email: string, password: string) {
    const input = `${email}||${password}`;

    const encrypted = CryptoJS.AES.encrypt(
      input,
      process.env.SECRET_KEY ?? "YourSecretKey123"
    ).toString();
    return encrypted;
  }

  execute(data: LoginInput): Promise<LoginOutput> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const { email, password } = data;
        if (email && password) {
          const student = await studentRepository.getByEmail(email);

          if (student && student.props.password === password)
            resolve({ accessToken: this.encryptToken(email, password) });
          else throw new Unauthorized("Invalid credentials!");
        } else throw new Error("Something went wrong...");
      } catch (error) {
        reject(error);
      }
    });
  }
}
