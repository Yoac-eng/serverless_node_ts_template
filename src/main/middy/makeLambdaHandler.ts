import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import { APIGatewayProxyEventV2 } from "aws-lambda";

import { IController } from "../../application/types/IController";
import { IHttpRequest, IHttpResponse } from "../../application/types/IHttp";

import { errorHandler } from "./middlewares/errorHandler";
import { schemaHandler } from "./middlewares/schemaHandler";

export function makeHandler<
  Tbody extends Record<string, any> | undefined = undefined,
>(controller: IController<Tbody>) {
  const m = middy<APIGatewayProxyEventV2, IHttpResponse>()
    .use(httpJsonBodyParser({ disableContentTypeError: true }))
    .use(httpMultipartBodyParser({ disableContentTypeError: true }))
    .use(errorHandler())
    .use(schemaHandler(controller.TBodySchema))
    .use(
      httpResponseSerializer({
        defaultContentType: "application/json",
        serializers: [
          {
            regex: /^application\/json$/,
            serializer: ({ body }) => JSON.stringify(body),
          },
        ],
      }),
    );

  return m.handler(async (event) => {
    // cast once: middy types the event as APIGatewayProxyEventV2 (body: string|null).
    // after middleware json-body-parser, body is parsed, but TS doesn't know; adapt to IHttpRequest<Tbody>.
    return controller.handler(event as IHttpRequest<Tbody>);
  });
}
