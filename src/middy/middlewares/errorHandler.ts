import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";

import { HttpError } from "../../errors/HttpError";

// this middleware will caught any uncaught exception inside the code
export function errorHandler(): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    onError: (request) => {
      const { error } = request;
      console.log(error);

      if (error && (error instanceof HttpError || "statusCode" in error)) {
        request.response = {
          ...request.response,
          statusCode: error.statusCode,
          body: JSON.stringify({
            message: error.message,
          }),
          headers: {
            ...request.response?.headers,
            "Content-Type": "application/json",
          },
        };
      } else {
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
