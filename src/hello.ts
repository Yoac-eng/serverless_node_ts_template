import { makeHandler } from "./middy/makeLambdaHandler";

interface IHelloRequestBody {
  firstName: string;
  lastName: string;
}

export const handler = makeHandler<IHelloRequestBody>(async (request) => {
  return {
    statusCode: 200,
    body: {
      nameSent: request.body?.firstName,
      lastName: request.body?.lastName,
    },
  };
});
