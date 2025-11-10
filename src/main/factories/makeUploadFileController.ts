import { s3Client } from "../../application/clients/s3Client";
import { UploadFileController } from "../../application/controllers/UploadFileController";
import { UploadFileUseCase } from "../../application/useCase/uploadFileUseCase";

export function makeUploadFileController() {
  return new UploadFileController(new UploadFileUseCase(s3Client));
}
