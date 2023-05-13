import DefaultOperationOutput from "../../../dtos/DefaultOperation.output";
import LoginInput from "../../../dtos/Login.input";
import Unauthorized from "../../../errors/UnauthorizedError";
import RepositoryFactory from "../../../gateways/repositories";
import IUseCase from "../IUseCase";
import * as CryptoJS from "crypto-js";

export default class ValidateAccessTokenUseCase
  implements IUseCase<LoginInput, DefaultOperationOutput>
{
  constructor(public repositoryFactory: RepositoryFactory) {}

  private decryptToken(token: string) {
    const decryptedBytes = CryptoJS.AES.decrypt(
      token,
      process.env.SECRET_KEY ?? "YourSecretKey123"
    );
    const decrypted = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  }

  execute(data: LoginInput): Promise<DefaultOperationOutput> {
    return new Promise(async (resolve, reject) => {
      const studentRepository =
        this.repositoryFactory.createStudentRepository();

      try {
        const { accessToken } = data;

        if (accessToken !== undefined) {
          const decriptedToken = this.decryptToken(accessToken);
          const [email, password] = decriptedToken.split("||");

          const student = await studentRepository.getByEmail(email);

          if (student && student.props.password === password)
            resolve({ sucess: true });
          else throw new Unauthorized("Invalid Token!");
        } else {
          throw new Error("Something went wrong...");
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
