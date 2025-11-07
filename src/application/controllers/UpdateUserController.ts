import { z } from "zod";

import { UpdateUserSchema } from "../schemas/UpdateUserSchema";
import { IController } from "../types/IController";
import { IHttpRequest, IHttpResponse } from "../types/IHttp";

type TUpdateUserBody = z.infer<typeof UpdateUserSchema>;
// type TUpdateUserHeaders = { authorization?: string };
type TUpdateUserHeaders = undefined;
type TUpdateUserParams = { userId: string };

export class UpdateUserController
  implements IController<TUpdateUserBody, TUpdateUserHeaders, TUpdateUserParams>
{
  async handler({
    params,
  }: IHttpRequest<
    TUpdateUserBody,
    TUpdateUserHeaders,
    TUpdateUserParams
  >): Promise<IHttpResponse> {
    return {
      statusCode: 200,
      body: {
        message: "Updating a user",
        users: params.userId,
      },
    };
  }
}
