export interface IHttpRequest<Tbody extends Record<string, any> | undefined> {
  body?: Tbody;
  headers?: Record<string, string>;
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}
