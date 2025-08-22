import { MiddlewareObj } from "@middy/core";
import { APIGatewayProxyEventV2 } from "aws-lambda";

export function bodyValidationHandler(): MiddlewareObj<any> {
  return {
    before: (request) => {
      console.log(request);
    },
  };
}
