import z from "zod";

export const UploadFileSchema = z.object({
  file: z.object({
    filename: z.string().min(1, "Filename is required"),
    mimetype: z.string().min(1, "mimetype is required"),
    content: z.string().min(1, "content is required"),
  }),
});
