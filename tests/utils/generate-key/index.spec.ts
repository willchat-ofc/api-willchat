import { UtilGenerateKey } from "../../../src/utils/generate-key";

jest.mock("uid", () => ({
  uid(): string {
    return "fake-key";
  },
}));

const makeSut = () => {
  const sut = new UtilGenerateKey();

  return {
    sut,
  };
};

describe("GenerateKey Util", () => {
  test("should return an key", () => {
    const { sut } = makeSut();
    const res = sut.generate();

    expect(res).toBe("fake-key");
  });
});
