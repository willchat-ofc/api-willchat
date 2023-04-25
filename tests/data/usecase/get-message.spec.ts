import type {
	GetMessageRepository,
	GetMessageRepositoryInput,
} from "../../../src/data/protocols/get-message-repository";
import { DbGetMessage } from "../../../src/data/usecase/get-message";
import { ChatEntity } from "../../../src/infra/db/postgreSQL/entities/chat-postgresql-entity";
import type { MessagesEntity } from "../../../src/infra/db/postgreSQL/entities/message-postgresql-entity";

import type { GetMessageInput } from "./../../../src/domain/usecase/get-message";

const makeGetMessageRepositoryStub = (): GetMessageRepository => {
	class GetMessageRepositoryStub implements GetMessageRepository {
		public async get(
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			data: GetMessageRepositoryInput,
		): Promise<Array<MessagesEntity>> {
			return [
				{
					chat: new ChatEntity(),
					message: "hello",
					userId: "fake-user-id",
					userName: "fake-user-name",
				},
			];
		}
	}

	return new GetMessageRepositoryStub();
};

const makeSut = () => {
	const getMessageRepository = makeGetMessageRepositoryStub();
	const sut = new DbGetMessage(getMessageRepository);

	return {
		sut,
		getMessageRepository,
	};
};

const fakeParams: GetMessageInput = {
	key: "fake-key",
};

describe("GetMessage Database", () => {
	test("should call getMessageRepository with correct values", async () => {
		const { sut, getMessageRepository } = makeSut();
		const getSpy = jest.spyOn(getMessageRepository, "get");

		await sut.get(fakeParams);

		expect(getSpy).toBeCalledWith(fakeParams);
	});

	test("should throw if getMessageRepository throws", async () => {
		const { sut, getMessageRepository } = makeSut();
		jest.spyOn(getMessageRepository, "get").mockRejectedValueOnce(new Error());

		const promise = sut.get(fakeParams);

		await expect(promise).rejects.toThrow();
	});

	test("should return array of message if success", async () => {
		const { sut } = makeSut();

		const res = await sut.get(fakeParams);

		expect(res).toStrictEqual([
			{
				chat: new ChatEntity(),
				message: "hello",
				userId: "fake-user-id",
				userName: "fake-user-name",
			},
		]);
	});
});
