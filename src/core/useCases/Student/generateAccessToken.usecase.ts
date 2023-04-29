import LoginInput from "../../../dtos/Login.input";
import LoginOutput from "../../../dtos/Login.output";
import RepositoryFactory from "../../../gateways/repositories";
import IUseCase from "../IUseCase";

export default class GenerateAccessToken
  implements IUseCase<LoginInput, LoginOutput>
{
  constructor(public repositoryFactory: RepositoryFactory) {}

  execute(data: LoginInput): Promise<LoginOutput> {
    throw new Error("Method not implemented.");
  }
}
