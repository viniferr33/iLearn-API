import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import ISQLService from "../../../infra/ISQLService";
import MockSQLService from "../../../infra/db.SQL/MockSQLService";
import GetStudentUseCase from "./GetStudent.usecase";

describe("GetStudentUseCase", () => {
  let getStudentUseCase: GetStudentUseCase;
  let mockSqlDb: ISQLService;

  beforeAll(() => {
    mockSqlDb = new MockSQLService();
    const repositoryFactory = new RepositoryFactory(mockSqlDb);

    getStudentUseCase = new GetStudentUseCase(repositoryFactory);
  });

  it("Should get a Student", async () => {
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

    const student = await getStudentUseCase.execute(input);

    expect(student.data).toBeDefined();
  });

  it("Should not get a Student - Student ID does not exists!", async () => {
    const input = { id: 42 };

    await expect(getStudentUseCase.execute(input)).rejects.toThrow(BadRequest);
  });
});
