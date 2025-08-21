import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";

import { HttpError } from "../../errors/HttpError";

// this middleware will caught any uncaught exception inside the code
export function errorHandler(): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    onError: (request) => {
      const { error } = request;

      if (error instanceof HttpError) {
        request.response = {
          ...request.response,
          statusCode: error.statusCode,
          body: error.message,
          headers: {
            ...request.response?.headers,
            "Content-Type": "application/json",
          },
        };
      } else {
        console.log(error);

        request.response = {
          ...request.response,
          statusCode: 500,
          body: JSON.stringify({ error: "Problema interno no servidor" }),
          headers: {
            ...request.response?.headers,
            "Content-Type": "application/json",
          },
        };
      }
    },
  };
}
