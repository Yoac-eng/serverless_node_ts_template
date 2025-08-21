import { randomUUID } from "node:crypto";

import { PutObjectCommand } from "@aws-sdk/client-s3";

import { s3Client } from "./clients/s3Client";
import { makeHandler } from "./middy/makeLambdaHandler";
import { IFile } from "./types/IFile";

interface IUploadRequestBody {
  file: IFile;
}

export const handler = makeHandler<IUploadRequestBody>(async (request) => {
  const { file } = request.body;

  const newFileName = `${randomUUID()}-${file.filename}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: "awslambdatestbucketxd",
    Key: newFileName,
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
