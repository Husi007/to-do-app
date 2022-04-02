import { BaseError } from "./base";

export class UnAuthorizedError401 extends BaseError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, UnAuthorizedError401.prototype);
  }

  statusCode: number = 401;
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
