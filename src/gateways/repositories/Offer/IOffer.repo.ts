import Offer from "../../../core/entities/Offer";
import ISQLService from "../../../infra/ISQLService";

export default interface IOfferRepository {
  sqlProvider: ISQLService;
  getAll(): Promise<Offer[]>;
  getByCategory(category: String): Promise<Offer[]>;
  getByStudent(studentId: number): Promise<Offer[]>;
  getById(id: number): Promise<Offer | null>;
  create(offer: Offer): Promise<Number>;
  update(offer: Offer): Promise<Boolean>;
  delete(id: number): Promise<Boolean>;
}
