import CreateEntityInput from "./CreateEntity.input";
import DefaultOperationOutput from "./DefaultOperation.output";
import EngagementOperationInput from "./EngagementOperations.input";
import EntityListOutput from "./EntityList.output";
import GetEntityOutput from "./GetEntity.output";
import GetEntityByIdInput from "./GetEntityById.input";
import LoginInput from "./Login.input";
import LoginOutput from "./Login.output";

type DTO =
  | CreateEntityInput<any>
  | DefaultOperationOutput
  | EngagementOperationInput
  | EntityListOutput<any>
  | GetEntityOutput<any>
  | GetEntityByIdInput
  | LoginInput
  | LoginOutput;

export { DTO };
