export class AlreadyExistsError extends Error {
  public constructor() {
    super("AlreadyExists error");
    this.name = "AlreadyExistsError";
  }
}
