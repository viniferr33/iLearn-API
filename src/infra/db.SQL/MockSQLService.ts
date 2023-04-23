import ISQLService from "../ISQLService";

export default class MockSQLService implements ISQLService {
  execute = jest.fn().mockResolvedValue(undefined);

  query = jest.fn().mockResolvedValue([]);

  findOne = jest.fn().mockResolvedValue(null);

  insert = jest.fn().mockResolvedValue(undefined);

  update = jest.fn().mockResolvedValue(undefined);

  delete = jest.fn().mockResolvedValue(undefined);
}
