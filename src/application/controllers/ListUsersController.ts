import { IController } from "../types/IController";
import { IHttpRequest, IHttpResponse } from "../types/IHttp";

export class ListUsersController implements IController {
  async handler({ params }: IHttpRequest<undefined>): Promise<IHttpResponse> {
    console.log("params " + params);
    return {
      statusCode: 200,
      body: {
        message: "Listing all users",
      },
    };
  }
}
