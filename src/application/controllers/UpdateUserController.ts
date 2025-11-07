import { z } from "zod";

import { IController } from "../types/IController";
import { IHttpRequest, IHttpResponse } from "../types/IHttp";

const UpdateUserSchema = z.object({
  name: z.string().min(1, "File is required"),
});

type TUpdateUserBody = z.infer<typeof UpdateUserSchema>;

export class UpdateUserController implements IController<TUpdateUserBody> {
  static readonly TBodySchema = UpdateUserSchema;

  async handler({
    params,
    body,
  }: IHttpRequest<TUpdateUserBody>): Promise<IHttpResponse> {
    console.log("user name " + body.name);
    return {
      statusCode: 200,
      body: {
        message: "Updating a user",
        users: params?.userId,
      },
    };
  }
}
