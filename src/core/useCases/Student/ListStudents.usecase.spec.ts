import RepositoryFactory from "../../../gateways/repositories";
import ISQLService from "../../../infra/ISQLService";
import MockSQLService from "../../../infra/db.SQL/MockSQLService";
import ListStudentsUseCase from "./ListStudents.usecase";

describe("ListStudentUseCase", () => {
  let listStudentUseCase: ListStudentsUseCase;
  let mockSqlDb: ISQLService;

  beforeAll(() => {
    mockSqlDb = new MockSQLService();
    const repositoryFactory = new RepositoryFactory(mockSqlDb);

    listStudentUseCase = new ListStudentsUseCase(repositoryFactory);
  });

  it("Should list Students", async () => {
    const mockStudent = {
      name: "Um nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    };

    jest.spyOn(mockSqlDb, "query").mockResolvedValueOnce([
      {
        id: 42,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...mockStudent,
      },
    ]);

    const student = await listStudentUseCase.execute({});

    expect(student.data).toBeDefined();
  });
});
