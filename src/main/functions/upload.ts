import { UploadFileController } from "../../application/controllers/UploadFileController";
import { makeHandler } from "../middy/makeLambdaHandler";
import { makeRoutesHandler } from "../middy/makeRoutesHandler";

export const handler = makeRoutesHandler([
  {
    path: "/file",
    method: "GET",
    handler: makeHandler(new UploadFileController()),
  },
]);
