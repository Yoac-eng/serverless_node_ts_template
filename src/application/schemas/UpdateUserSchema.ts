import z from "zod";

export const UpdateUserSchema = z.object({
  name: z.string().min(1, "File is required"),
});
