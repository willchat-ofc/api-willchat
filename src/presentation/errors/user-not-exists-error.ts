export class UserNotExistsError extends Error {
  public constructor() {
    super("UserNotExists error");
    this.name = "UserNotExistsError";
  }
}
