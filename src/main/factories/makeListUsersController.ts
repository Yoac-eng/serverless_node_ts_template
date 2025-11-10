import { ListUsersController } from "../../application/controllers/ListUsersController";

export function makeListUsersController() {
  return new ListUsersController();
}
