import HelpRequest, {
    HelpRequestProps,
  } from "../../../core/entities/HelpRequest";
  import DatabaseError from "../../../errors/DatabaseError";
  import ISQLService from "../../../infra/ISQLService";
  import IHelpRequestRepository from "./IHelpRequest.repo";
  
  export default class HelpRequestSQLRepository
    implements IHelpRequestRepository
  {
    constructor(public sqlProvider: ISQLService) {}
  
    getAll(): Promise<HelpRequest[]> {
      return new Promise((resolve, reject) => {
        this.sqlProvider
          .query<HelpRequestProps>("SELECT * FROM HelpRequests")
          .then((result) => resolve(result.map((obj) => HelpRequest.create(obj))))
          .catch((err) => {
            reject(new DatabaseError(err.message));
          });
      });
    }
    getByCategory(category: string): Promise<HelpRequest[]> {
      return new Promise((resolve, reject) => {
        this.sqlProvider
          .query<HelpRequestProps>(
            "SELECT * FROM HelpRequests WHERE category = $1",
            [category]
          )
          .then((result) => resolve(result.map((obj) => HelpRequest.create(obj))))
          .catch((err) => {
            reject(new DatabaseError(err.message));
          });
      });
    }
    getByStudent(studentId: number): Promise<HelpRequest[]> {
      return new Promise((resolve, reject) => {
        this.sqlProvider
          .query<HelpRequestProps>(
            "SELECT * FROM HelpRequests WHERE category = $1",
            [String(studentId).valueOf()]
          )
          .then((result) => resolve(result.map((obj) => HelpRequest.create(obj))))
          .catch((err) => {
            reject(new DatabaseError(err.message));
          });
      });
    }
    getById(id: number): Promise<HelpRequest | null> {
      return new Promise((resolve, reject) => {
        this.sqlProvider
          .findOne<HelpRequestProps>(
            "SELECT * FROM HelpRequests WHERE category = $1",
            [String(id).valueOf()]
          )
          .then((result) =>
            resolve(result !== null ? HelpRequest.create(result) : null)
          )
          .catch((err) => {
            reject(new DatabaseError(err.message));
          });
      });
    }
    create(helpRequest: HelpRequest): Promise<Number> {
      return new Promise((resolve, reject) => {
        this.sqlProvider
          .insert<HelpRequest>("HelpRequests", helpRequest)
          .then((id) => resolve(id))
          .catch((err) => reject(new DatabaseError(err.message)));
      });
    }
    update(helpRequest: HelpRequest): Promise<Boolean> {
      return new Promise((resolve, reject) => {
        this.sqlProvider
          .update("HelpRequests", helpRequest, { id: helpRequest.id })
          .then(() => resolve(true))
          .catch((err) => reject(new DatabaseError(err.message)));
      });
    }
    delete(id: number): Promise<Boolean> {
      return new Promise((resolve, reject) => {
        this.sqlProvider
          .delete("HelpRequests", { id: id })
          .then(() => resolve(true))
          .catch((err) => reject(new DatabaseError(err.message)));
      });
    }
  }
  