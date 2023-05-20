import BadRequest from "../../../errors/BadRequestError";
import RepositoryFactory from "../../../gateways/repositories";
import ISQLService from "../../../infra/ISQLService";
import MockSQLService from "../../../infra/db.SQL/MockSQLService";
import UpdateStudentUseCase from "./UpdateStudent.usecase";

describe("UpdateStudentUseCase", () => {
  let updateStudentUseCase: UpdateStudentUseCase;
  let mockSqlDb: ISQLService;

  beforeAll(() => {
    mockSqlDb = new MockSQLService();
    const repositoryFactory = new RepositoryFactory(mockSqlDb);

    updateStudentUseCase = new UpdateStudentUseCase(repositoryFactory);
  });

  it("Should update a Student", async () => {
    const input = {
      id: 42,
      name: "Um outro nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    };

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

    const updatedStudent = await updateStudentUseCase.execute({ data: input });

    expect(updatedStudent.id).toBeDefined();
    expect(updatedStudent.name).toBe(input.name);
  });

  it("Should not update a Student - Student ID does not exists!", async () => {
    const input = { id: 42 };

    await expect(updateStudentUseCase.execute({ data: input })).rejects.toThrow(
      BadRequest
    );
  });

  it("Should not update a Student - Cannot update email!", async () => {
    const input = {
      id: 42,
      name: "Um outro nome qualquer",
      email: "email_de_modificado@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    };

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

    await expect(updateStudentUseCase.execute({ data: input })).rejects.toThrow(
      BadRequest
    );
  });

  it("Should not update a Student - Invalid fields!", async () => {
    const input = {
      id: 42,
      name: "Um outro nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "aaaa",
    };

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

    await expect(updateStudentUseCase.execute({ data: input })).rejects.toThrow(
      BadRequest
    );
  });
});
