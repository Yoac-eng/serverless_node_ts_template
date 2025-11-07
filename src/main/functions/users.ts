import { ListUsersController } from "../../application/controllers/ListUsersController";
import { UpdateUserController } from "../../application/controllers/UpdateUserController";
import { makeHandler } from "../middy/makeLambdaHandler";
import { makeRoutesHandler } from "../middy/makeRoutesHandler";

export const handler = makeRoutesHandler([
  {
    path: "/users",
    method: "GET",
    handler: makeHandler(new ListUsersController()),
  },
  {
    path: "/users/{userId}",
    method: "PUT",
    handler: makeHandler(new UpdateUserController()),
  },
]);
