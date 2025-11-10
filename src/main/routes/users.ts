import { UpdateUserSchema } from "../../application/schemas/UpdateUserSchema";
import { makeListUsersController } from "../factories/makeListUsersController";
import { makeUpdateUserController } from "../factories/makeUpdateUserController";
import { lambdaEventAdapter } from "../middy/lambdaEventAdapter";
import { makeRoutesHandler } from "../middy/makeRoutesHandler";

export const handler = makeRoutesHandler([
  {
    path: "/users",
    method: "GET",
    handler: lambdaEventAdapter(makeListUsersController()),
  },
  {
    path: "/users/{userId}",
    method: "PUT",
    handler: lambdaEventAdapter(makeUpdateUserController(), UpdateUserSchema),
  },
]);
