import Student from "../../../core/entities/Student";
import ISQLService from "../../../infra/ISQLService";

export default interface IStudentRepository {
  sqlProvider: ISQLService;
  getAll(): Promise<Student[]>;
  getById(id: number): Promise<Student | null>;
  getByEmail(email: string): Promise<Student | null>;
  create(student: Student): Promise<Number>;
  update(student: Student): Promise<Boolean>;
  delete(id: number): Promise<Boolean>;
  acceptOffer(studentId: number, offerId: number): Promise<Number>;
  engageHelpRequest(studentId: number, HelpRequestId: number): Promise<Number>;
}
