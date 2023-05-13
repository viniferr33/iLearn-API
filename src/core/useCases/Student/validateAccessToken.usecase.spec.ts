import Unauthorized from "../../../errors/UnauthorizedError";
import RepositoryFactory from "../../../gateways/repositories";
import ISQLService from "../../../infra/ISQLService";
import MockSQLService from "../../../infra/db.SQL/MockSQLService";
import ValidateAccessTokenUseCase from "./validateAccessToken.usecase";

describe("ValidateAccessTokenUseCase", () => {
  let validateAccessTokenUseCase: ValidateAccessTokenUseCase;
  let mockSqlDb: ISQLService;

  beforeAll(() => {
    mockSqlDb = new MockSQLService();
    const repositoryFactory = new RepositoryFactory(mockSqlDb);

    validateAccessTokenUseCase = new ValidateAccessTokenUseCase(
      repositoryFactory
    );
  });

  it("Should validate an Access Token", async () => {
    const input = {
      accessToken:
        "U2FsdGVkX19kHW87FoR1xNvKTHUGk/rebfIhqSuNSB3s8WP/A83F++6LjszBMd3IbkmOeHojX1YehA/vV66V0g==",
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

    const accessToken = await validateAccessTokenUseCase.execute(input);

    expect(accessToken.sucess).toBeDefined();
    expect(accessToken.sucess).toBe(true);
  });

  it("Should not validate an Access Token - Invalid Credentials", async () => {
    const input = {
      accessToken:
        "",
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

    await expect(validateAccessTokenUseCase.execute(input)).rejects.toThrow(
      Unauthorized
    );
  });
});
