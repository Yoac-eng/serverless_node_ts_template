import { randomUUID } from "node:crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from "./clients/s3Client";
import { HttpError } from "./errors/HttpError";
import { makeHandler } from "./middy/makeLambdaHandler";
import { IFile } from "./types/IFile";

interface IUploadRequestBody {
  file: IFile;
}

export const handler = makeHandler<IUploadRequestBody>(async (request) => {
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
});
