import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import ISQLService from "../../../infra/ISQLService";
import MockSQLService from "../../../infra/db.SQL/MockSQLService";
import DeleteStudentUseCase from "./DeleteStudent.usecase";

describe("DeleteStudentUseCase", () => {
  let deleteStudentUseCase: DeleteStudentUseCase;
  let mockSqlDb: ISQLService;

  beforeAll(() => {
    mockSqlDb = new MockSQLService();
    const repositoryFactory = new RepositoryFactory(mockSqlDb);

    deleteStudentUseCase = new DeleteStudentUseCase(repositoryFactory);
  });

  it("Should delete a Student", async () => {
    const input = { id: 42 };
    const mockStudent = {
      name: "Um nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    };

    jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce({
      id: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...mockStudent,
    });
    jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce(null);

    const deletedStudent = await deleteStudentUseCase.execute(input);

    expect(deletedStudent.sucess).toBeDefined();
    expect(deletedStudent.sucess).toBe(true);
  });

  it("Should not delete a Student - Student ID does not exists!", async () => {
    const input = { id: 42 };

    await expect(deleteStudentUseCase.execute(input)).rejects.toThrow(
      BadRequest
    );
  });
});
