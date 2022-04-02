import { BaseError } from "./base";

export class NoResourceFoundError404 extends BaseError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NoResourceFoundError404.prototype);
  }

  statusCode: number = 404;
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
