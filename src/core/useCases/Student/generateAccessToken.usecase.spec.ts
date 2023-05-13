import Unauthorized from "../../../errors/UnauthorizedError";
import RepositoryFactory from "../../../gateways/repositories";
import ISQLService from "../../../infra/ISQLService";
import MockSQLService from "../../../infra/db.SQL/MockSQLService";
import GenerateAccessTokenUseCase from "./generateAccessToken.usecase";

describe("GenerateAccessTokenUseCase", () => {
  let generateAccessTokenUseCase: GenerateAccessTokenUseCase;
  let mockSqlDb: ISQLService;

  beforeAll(() => {
    mockSqlDb = new MockSQLService();
    const repositoryFactory = new RepositoryFactory(mockSqlDb);

    generateAccessTokenUseCase = new GenerateAccessTokenUseCase(
      repositoryFactory
    );
  });

  it("Should generate an Access Token", async () => {
    const input = {
      email: "email_de_teste@teste.com",
      password: "umasenhaforte@123AAA",
    };

    jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce({
      id: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Um nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    });

    const accessToken = await generateAccessTokenUseCase.execute(input);

    expect(accessToken.accessToken).toBeDefined();
    expect(accessToken.accessToken.length).toBe(128);
  });

  it("Should not generate an Access Token - Invalid Credentials", async () => {
    const input = {
      email: "email_de_teste@teste.com",
      password: ":D",
    };

    jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce({
      id: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
      name: "Um nome qualquer",
      email: "email_de_teste@teste.com",
      phone: "4002-8922",
      password: "umasenhaforte@123AAA",
    });

    await expect(generateAccessTokenUseCase.execute(input)).rejects.toThrow(
      Unauthorized
    );
  });

  it("Should not generate an Access Token - Student do not exist!", async () => {
    const input = {
        email: "aaaaaaaaaaa@teste.com",
        password: ":D",
      };
  
      jest.spyOn(mockSqlDb, "findOne").mockResolvedValueOnce({
        id: 42,
        createdAt: new Date(),
        updatedAt: new Date(),
        name: "Um nome qualquer",
        email: "email_de_teste@teste.com",
        phone: "4002-8922",
        password: "umasenhaforte@123AAA",
      });
  
      await expect(generateAccessTokenUseCase.execute(input)).rejects.toThrow(
        Unauthorized
      );
  });
});
