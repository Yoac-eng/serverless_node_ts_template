import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import httpMultipartBodyParser from "@middy/http-multipart-body-parser";
import httpResponseSerializer from "@middy/http-response-serializer";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import z from "zod";

import { IController } from "../../application/types/IController";
import { IHttpRequest, IHttpResponse } from "../../application/types/IHttp";
import { sanitizeObject } from "../utils/sanitizeObject";

import { errorHandler } from "./middlewares/errorHandler";
import { schemaHandler } from "./middlewares/schemaHandler";

export function lambdaEventAdapter<
  TBody extends Record<string, any> = undefined,
  THeaders extends Record<string, string> = Record<string, string>,
  TParams extends Record<string, string> = Record<string, string>,
>(
  controller: IController<TBody, THeaders, TParams>,
  TBodySchema?: z.ZodObject<any, any>,
) {
  const m = middy<APIGatewayProxyEventV2, IHttpResponse>()
    .use(httpJsonBodyParser({ disableContentTypeError: true }))
    .use(httpMultipartBodyParser({ disableContentTypeError: true }))
    .use(errorHandler())
    .use(schemaHandler(TBodySchema))
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
    // event chega em runtime ainda como "APIGatewayProxyEventV2"
    const sanitizedHeaders = sanitizeObject(event.headers);
    const sanitizedParams = sanitizeObject(event.pathParameters);

    // adaptação do event deve ser feita explicitamente pois ts não entende a transformação do body pelo middleware em runtime
    const adaptedEvent: IHttpRequest<TBody, THeaders, TParams> = {};

    if (event.body !== undefined && event.body !== null) {
      adaptedEvent.body = event.body as TBody;
    }

    if (Object.keys(sanitizedHeaders).length > 0) {
      adaptedEvent.headers = sanitizedHeaders as THeaders;
    }

    if (Object.keys(sanitizedParams).length > 0) {
      adaptedEvent.params = sanitizedParams as TParams;
    }
    console.log("adaptedEvent " + JSON.stringify(adaptedEvent));
    return controller.handler(adaptedEvent);
  });
}
