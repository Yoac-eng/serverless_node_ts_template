import { IController } from "../types/IController";

export class ListUsersController implements IController {
  async handler() {
    return {
      statusCode: 200,
      body: {
        message: "Listing all users",
      },
    };
  }
}
