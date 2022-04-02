import { BaseError } from "./base";

export class BadRequestError400 extends BaseError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError400.prototype);
  }

  statusCode: number = 400;
  serializeErrors() {
    return [{ message: this.message }];
  }
}
