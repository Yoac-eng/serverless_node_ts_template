import { z } from "zod";

import { makeHandler } from "./middy/makeLambdaHandler";

const HelloRequestBodySchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

type IHelloRequestBody = z.infer<typeof HelloRequestBodySchema>;

export const handler = makeHandler<IHelloRequestBody>(async (request) => {
  return {
    statusCode: 200,
    body: {
      firstName: request.body?.firstName,
      lastName: request.body?.lastName,
    },
  };
}, HelloRequestBodySchema);
