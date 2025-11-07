import { UploadFileController } from "../../application/controllers/UploadFileController";
import { UploadFileSchema } from "../../application/schemas/UploadFileSchema";
import { lambdaEventAdapter } from "../middy/lambdaEventAdapter";
import { makeRoutesHandler } from "../middy/makeRoutesHandler";

export const handler = makeRoutesHandler([
  {
    path: "/upload",
    method: "POST",
    handler: lambdaEventAdapter(new UploadFileController(), UploadFileSchema),
  },
]);
