import { BaseError } from "./base";

export class CrossOrginCommunication505 extends BaseError {
  constructor(public message: string) {
    super(message);
    Object.setPrototypeOf(this, CrossOrginCommunication505.prototype);
  }

  statusCode: number = 500;
  serializeErrors() {
    return [
      {
        message: this.message,
      },
    ];
  }
}
