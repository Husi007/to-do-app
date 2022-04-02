export abstract class BaseError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  abstract statusCode: number;
  abstract serializeErrors(): { message: string; field?: string }[];
}
