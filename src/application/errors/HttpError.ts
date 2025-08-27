export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message?: string,
  ) {
    super();
    this.message = message;
    this.name = "HttpError";
  }
}
