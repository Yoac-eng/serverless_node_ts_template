import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";
import { z } from "zod";

import { HttpError } from "../../../application/errors/HttpError";

// this middleware will get any uncaught exception inside the code
export function errorHandler(): MiddlewareObj<APIGatewayProxyEventV2> {
  return {
    onError: (request) => {
      const { error } = request;
      console.log(error);

      if (error instanceof z.ZodError) {
        const flattenedError = z.flattenError(error);

        request.response = {
          ...request.response,
          statusCode: 400,
          body: JSON.stringify({
            message: "Body inválido",
            errors: flattenedError.formErrors,
            fieldErrors: flattenedError.fieldErrors,
          }),
          headers: {
            ...request.response?.headers,
            "Content-Type": "application/json",
          },
        };
        return;
      }

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
        return;
      }

      request.response = {
        ...request.response,
        statusCode: 500,
        body: JSON.stringify({ error: "Problema interno no servidor" }),
        headers: {
          ...request.response?.headers,
          "Content-Type": "application/json",
        },
      };
    },
  };
}
