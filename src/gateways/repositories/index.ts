import ISQLService from "../../infra/ISQLService";
import HelpRequestSQLRepository from "./HelpRequest/HelpRequestSQL.repo";
import IHelpRequestRepository from "./HelpRequest/IHelpRequest.repo";
import IOfferRepository from "./Offer/IOffer.repo";
import OfferSQLRepository from "./Offer/OfferSQL.repo";
import IStudentRepository from "./Student/IStudent.repo";
import StudentSQLRepository from "./Student/StudentSQL.repo";

export default class RepositoryFactory {
  constructor(public sqlService: ISQLService) {}

  createStudentRepository(): IStudentRepository {
    return new StudentSQLRepository(this.sqlService);
  }

  createOfferRepository(): IOfferRepository {
    return new OfferSQLRepository(this.sqlService);
  }

  createHelpRequestRepository(): IHelpRequestRepository {
    return new HelpRequestSQLRepository(this.sqlService);
  }
}
