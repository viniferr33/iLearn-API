import HelpRequest from "../../../core/entities/HelpRequest";
import ISQLService from "../../../infra/ISQLService";

export default interface IHelpRequestRepository {
  sqlProvider: ISQLService;
  getAll(): Promise<HelpRequest[]>;
  getByCategory(category: String): Promise<HelpRequest[]>;
  getByStudent(studentId: number): Promise<HelpRequest[]>;
  getById(id: number): Promise<HelpRequest | null>;
  create(HelpRequest: HelpRequest): Promise<Number>;
  update(HelpRequest: HelpRequest): Promise<Boolean>;
  delete(id: number): Promise<Boolean>;
}
