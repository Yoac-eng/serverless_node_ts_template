export interface IHttpRequest<
  TBody extends Record<string, any> | undefined = undefined,
  THeaders extends Record<string, string> = Record<string, string>,
  TParams extends Record<string, string> = Record<string, string>,
> {
  body?: TBody;
  headers?: THeaders;
  params?: TParams;
}

export interface IHttpResponse {
  statusCode: number;
  body?: Record<string, any>;
  headers?: Record<string, string>;
}
