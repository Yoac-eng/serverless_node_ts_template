import { randomUUID } from "node:crypto";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { IUseCase } from "../types/IUseCase";

type UploadFileUseCaseParams = {
  filename: string;
  mimetype: string;
  content: string;
};

export class UploadFileUseCase
  implements IUseCase<UploadFileUseCaseParams, string>
{
  constructor(private readonly s3Client: S3Client) {}

  async execute({
    filename,
    mimetype,
    content,
  }: UploadFileUseCaseParams): Promise<string> {
    const newFileName = `${randomUUID()}-${filename}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: "awslambdatestbucketxd",
      Key: newFileName,
      Body: content,
    });

    await this.s3Client.send(putObjectCommand);

    return newFileName;
  }
}
