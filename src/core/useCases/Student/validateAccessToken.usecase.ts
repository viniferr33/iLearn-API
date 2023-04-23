import DefaultOperationOutput from "../../../dtos/DefaultOperation.output";
import LoginInput from "../../../dtos/Login.input";
import RepositoryFactory from "../../../gateways/repositories";
import IUseCase from "../IUseCase";

export default class ValidateAccessToken
  implements IUseCase<LoginInput, DefaultOperationOutput>
{
  constructor(public repositoryFactory: RepositoryFactory) {}

  execute(data: LoginInput): Promise<DefaultOperationOutput> {
    throw new Error("Method not implemented.");
  }
}
