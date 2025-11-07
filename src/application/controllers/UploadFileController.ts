import { randomUUID } from "node:crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";

import { s3Client } from "../clients/s3Client";
import { HttpError } from "../errors/HttpError";
import { UploadFileSchema } from "../schemas/UploadFileSchema";
import { IController } from "../types/IController";
import { IHttpRequest } from "../types/IHttp";

type TUploadFileRequestBody = z.Infer<typeof UploadFileSchema>;

export class UploadFileController
  implements IController<TUploadFileRequestBody>
{
  async handler(request: IHttpRequest<TUploadFileRequestBody>) {
    const { file } = request.body;

    if (!file) {
      throw new HttpError(400, { error: "A file is required" });
    }

    const newFileName = `${randomUUID()}-${file.filename}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: "awslambdatestbucketxd",
      Key: newFileName,
      Body: file.content,
    });

    await s3Client.send(putObjectCommand);

    return {
      statusCode: 200,
      body: {
        message: "File added successfully",
        file: newFileName,
      },
    };
  }
}
