import { UtilDecodeJwt } from "../../../src/utils/decode-jwt";

jest.mock("jsonwebtoken", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decode(token: string) {
    return {
      accountId: "123",
    };
  },
}));

const makeSut = () => {
  return {
    sut: new UtilDecodeJwt(),
  };
};

describe("DecodeJwt Util", () => {
  test("ensure return correct value", () => {
    const { sut } = makeSut();
    const decoded = sut.decode("123");

    expect(decoded).toStrictEqual({
      accountId: "123",
    });
  });
});
