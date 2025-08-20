import { makeHandler } from "./middy/makeLambdaHandler";

interface IHelloRequestBody {
  firstName: string;
  lastName: string;
  file: any;
}

export const handler = makeHandler<IHelloRequestBody>(async (request) => {
  return {
    statusCode: 200,
    body: {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      file: request.body.file,
    },
  };
});
