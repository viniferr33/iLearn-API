import Student, {
  StudentProps,
  StudentOffer,
  StudentHelpRequest,
} from "../../../core/entities/Student";
import DatabaseError from "../../../errors/DatabaseError";
import ISQLService from "../../../infra/ISQLService";
import IStudentRepository from "./IStudent.repo";

export default class StudentSQLRepository implements IStudentRepository {
  constructor(public sqlProvider: ISQLService) {}

  getAll(): Promise<Student[]> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .query<StudentProps>("SELECT * FROM Students")
        .then((result) => resolve(result.map((obj) => Student.create(obj))))
        .catch((err) => {
          reject(new DatabaseError(err.message));
        });
    });
  }
  getById(id: number): Promise<Student | null> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .findOne<StudentProps>("SELECT * FROM Students WHERE Id = $1", [
          String(id).toString(),
        ])
        .then((result) =>
          resolve(result !== null ? Student.create(result) : null)
        )
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  getByEmail(email: string): Promise<Student | null> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .findOne<StudentProps>("SELECT * FROM Students WHERE Email = $1", [
          email,
        ])
        .then((result) =>
          resolve(result !== null ? Student.create(result) : null)
        )
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  create(student: Student): Promise<Number> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .insert<Student>("Students", student)
        .then((id) => resolve(id))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  update(student: Student): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .update("Students", student, { id: student.id })
        .then(() => resolve(true))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  delete(id: number): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.sqlProvider
        .delete("Students", { id: id })
        .then(() => resolve(true))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  acceptOffer(studentId: number, offerId: number): Promise<Number> {
    return new Promise((resolve, reject) => {
      const studentOffer = StudentOffer.create({ studentId, offerId });

      this.sqlProvider
        .insert<StudentOffer>("OfferAccepted", studentOffer)
        .then((id) => resolve(id))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
  engageHelpRequest(studentId: number, helpRequestId: number): Promise<Number> {
    return new Promise((resolve, reject) => {
      const studentHelpRequest = StudentHelpRequest.create({
        studentId,
        helpRequestId,
      });

      this.sqlProvider
        .insert<StudentHelpRequest>("OfferAccepted", studentHelpRequest)
        .then((id) => resolve(id))
        .catch((err) => reject(new DatabaseError(err.message)));
    });
  }
}
