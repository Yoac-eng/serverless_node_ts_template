import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";

export function schemaHandler<T extends z.ZodObject>(
  bodySchema: T,
): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    before: (request) => {
      const { body } = request.event;

      if (!bodySchema) {
        return request;
      }

      bodySchema.parse(body);
    },
  };
}
