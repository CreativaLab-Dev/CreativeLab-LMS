import * as z from "zod";

export const NewResourceFormSchema = z.object({
  title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres" }),
});