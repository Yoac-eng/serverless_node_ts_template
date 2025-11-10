import { z } from "zod";

import { HttpError } from "../errors/HttpError";
import { UploadFileSchema } from "../schemas/UploadFileSchema";
import { IController } from "../types/IController";
import { IHttpRequest } from "../types/IHttp";
import { UploadFileUseCase } from "../useCase/uploadFileUseCase";

type TUploadFileRequestBody = z.Infer<typeof UploadFileSchema>;

export class UploadFileController
  implements IController<TUploadFileRequestBody>
{
  constructor(private readonly uploadFileUseCase: UploadFileUseCase) {}

  async handler(request: IHttpRequest<TUploadFileRequestBody>) {
    const { file } = request.body;
    const { filename, mimetype, content } = file;

    if (!file) {
      throw new HttpError(400, "A file is required");
    }

    const newFileName = await this.uploadFileUseCase.execute({
      filename,
      mimetype,
      content,
    });

    return {
      statusCode: 200,
      body: {
        message: "File added successfully",
        file: newFileName,
      },
    };
  }
}
