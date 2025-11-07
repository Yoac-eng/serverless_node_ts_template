import { ListUsersController } from "../../application/controllers/ListUsersController";
import { UpdateUserController } from "../../application/controllers/UpdateUserController";
import { UpdateUserSchema } from "../../application/schemas/UpdateUserSchema";
import { lambdaEventAdapter } from "../middy/lambdaEventAdapter";
import { makeRoutesHandler } from "../middy/makeRoutesHandler";

export const handler = makeRoutesHandler([
  {
    path: "/users",
    method: "GET",
    handler: lambdaEventAdapter(new ListUsersController()),
  },
  {
    path: "/users/{userId}",
    method: "PUT",
    handler: lambdaEventAdapter(new UpdateUserController(), UpdateUserSchema),
  },
]);
