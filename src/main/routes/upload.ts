import { UploadFileSchema } from "../../application/schemas/UploadFileSchema";
import { makeUploadFileController } from "../factories/makeUploadFileController";
import { lambdaEventAdapter } from "../middy/lambdaEventAdapter";
import { makeRoutesHandler } from "../middy/makeRoutesHandler";

export const handler = makeRoutesHandler([
  {
    path: "/upload",
    method: "POST",
    handler: lambdaEventAdapter(makeUploadFileController(), UploadFileSchema),
  },
]);
