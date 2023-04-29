import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import ISQLService from "../../../infra/ISQLService";
import MockSQLService from "../../../infra/db.SQL/MockSQLService";
import CreateStudentUseCase from "./CreateStudent.usecase";

describe("CreateStudentUseCase", () => {
  let createStudentUseCase: CreateStudentUseCase;
  let mockSqlDb: ISQLService;

  beforeAll(() => {
    mockSqlDb = new MockSQLService();
    const repositoryFactory = new RepositoryFactory(mockSqlDb);

    createStudentUseCase = new CreateStudentUseCase(repositoryFactory);
  });

  it("Should create a Student", async () => {
    const input = {
      name: "Um nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    };

    jest.spyOn(mockSqlDb, "insert").mockResolvedValueOnce(42);
    jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce(null);
    jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce({
      id: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input,
    });

    const createdStudent = await createStudentUseCase.execute({ data: input });

    expect(createdStudent.data).toBeDefined();
    expect(createdStudent.data.name).toBe(input.name);
    expect(createdStudent.data.email).toBe(input.email);
    expect(createdStudent.data.phone).toBe(input.phone);
    expect(createdStudent.data.password).toBe(input.password);
  });

  it("Should not create a Student - Incompatible fields", async () => {
    const input = {
      name: "Um nome qualquer",
      email: "um_não_email",
      phone: "4002-8922",
      password: "umasenhafraca",
    };

    await expect(createStudentUseCase.execute({ data: input })).rejects.toThrow(
      BadRequest
    );
  });

  it("Should not create a Student - Student already exists!", async () => {
    const input = {
      name: "Um usuario que ja existe",
      email: "um_usuario_existente@teste.com",
      phone: "4002-8922",
      password: "Outra senha",
    };

    jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce({
      id: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
      ...input,
    });
    await expect(createStudentUseCase.execute({ data: input })).rejects.toThrow(
      BadRequest
    );
  });
});
