import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";

export function schemaHandler<T extends z.ZodObject>(
  bodySchema: T,
): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    before: (request) => {
      console.log("bodySchema in middleware " + JSON.stringify(bodySchema));
      const { body } = request.event;

      if (bodySchema && body) bodySchema.parse(body);
    },
  };
}
