import { randomUUID } from "node:crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { z } from "zod";

import { s3Client } from "../clients/s3Client";
import { HttpError } from "../errors/HttpError";
import { IController } from "../types/IController";
import { IHttpRequest } from "../types/IHttp";

const UploadFileSchema = z.object({
  file: z.object({
    filename: z.string().min(1, "Filename is required"),
    mimetype: z.string().min(1, "mimetype is required"),
    content: z.string().min(1, "content is required"),
  }),
});

type TUploadFileRequestBody = z.Infer<typeof UploadFileSchema>;

export class UploadFileController
  implements IController<TUploadFileRequestBody>
{
  static readonly TBodySchema = UploadFileSchema;

  async handler(request: IHttpRequest<TUploadFileRequestBody>) {
    const { file } = request.body;

    if (!file) {
      throw new HttpError(400, "A file is required");
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
