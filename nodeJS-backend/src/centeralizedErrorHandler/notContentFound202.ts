import { BaseError } from "./base";

export class NoConentFoundError202 extends BaseError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, NoConentFoundError202.prototype);
  }

  statusCode: number = 202;
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
