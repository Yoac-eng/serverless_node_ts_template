import { IHttpRequest, IHttpResponse } from "./IHttp";

export interface IController<
  TBody extends Record<string, any> | undefined = undefined,
> {
  handler(request: IHttpRequest<TBody>): Promise<IHttpResponse>;
}
