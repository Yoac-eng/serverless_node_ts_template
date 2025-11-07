import { z } from "zod";

import { IHttpRequest, IHttpResponse } from "./IHttp";

export interface IController<
  TBody extends Record<string, any> | undefined = undefined,
> {
  readonly TBodySchema?: z.ZodObject<
    any,
    TBody extends undefined ? any : TBody
  >;
  handler(request: IHttpRequest<TBody>): Promise<IHttpResponse>;
}
