import type { GetKey, GetKeyInput } from "../../../src/domain/usecase/get-key";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { KeyEntity } from "../../../src/infra/db/postgreSQL/entities/key-postgresql-entity";
import { GetKeyController } from "../../../src/presentation/controller/key/get-key";
import { UserNotExistsError } from "../../../src/presentation/errors/user-not-exists-error";
import {
  badRequest,
  ok,
  serverError,
} from "../../../src/presentation/helpers/http-helper";
import type { HttpRequest } from "../../../src/presentation/protocols/http";

const makeGetKeyStub = () => {
  class GetKeyStub implements GetKey {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public async get(data: GetKeyInput): Promise<Array<KeyEntity>> {
      return [
        {
          id: "fake-key",
          key: "123",
          userId: "fake-user-id",
          chat: new ChatEntity(),
        },
      ];
    }
  }

  return new GetKeyStub();
};

const makeSut = () => {
  const getKey = makeGetKeyStub();
  const sut = new GetKeyController(getKey);

  return {
    sut,
    getKey,
  };
};

const fakeHttpRequest: HttpRequest = {
  header: {
    accesstoken: "fake-accesstoken",
  },
  body: {
    accountId: "fake-account-id",
  },
};

describe("GetKey Controller", () => {
  test("should call getKey with correctly value", async () => {
    const { sut, getKey } = makeSut();
    const getSpy = jest.spyOn(getKey, "get");

    await sut.handle(fakeHttpRequest);

    expect(getSpy).toHaveBeenCalledWith({
      userId: "fake-account-id",
    });
  });

  test("should return serverError if getKey throws", async () => {
    const { sut, getKey } = makeSut();
    jest.spyOn(getKey, "get").mockRejectedValueOnce(new Error());

    const promise = await sut.handle(fakeHttpRequest);

    expect(promise).toStrictEqual(serverError());
  });

  test("should return badRequest if getKey return a void array", async () => {
    const { sut, getKey } = makeSut();
    jest.spyOn(getKey, "get").mockResolvedValueOnce([]);

    const res = await sut.handle(fakeHttpRequest);

    expect(res).toStrictEqual(badRequest(new UserNotExistsError()));
  });

  test("should return key if success", async () => {
    const { sut } = makeSut();
    const res = await sut.handle(fakeHttpRequest);

    expect(res).toStrictEqual(
      ok([
        {
          id: "fake-key",
          key: "123",
          userId: "fake-user-id",
          chat: new ChatEntity(),
        },
      ])
    );
  });
});
