import { IHttpRequest, IHttpResponse } from "./IHttp";

export interface IController<
  TBody extends Record<string, any> | undefined = undefined,
  THeaders extends Record<string, string> = Record<string, string>,
  TParams extends Record<string, string> = Record<string, string>,
> {
  handler(
    request: IHttpRequest<TBody, THeaders, TParams>,
  ): Promise<IHttpResponse>;
}
