export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message?: Record<string, any>,
  ) {
    super(JSON.stringify(message));

    this.name = "HttpError";
  }
}
