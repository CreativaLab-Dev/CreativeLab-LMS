import * as z from "zod";

export const newResourceFormSchema = z.object({
  title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres" }),
});

export const resourceTitleFormSchema = z.object({
  title: z.string().min(3, { message: "El titulo debe tener al menos 3 caracteres" }),
});

export const resourceContentFormSchema = z.object({
  description: z.string().min(3, { message: "La description debe tener al menos 3 caracteres" }),
});

export const resourceImageFormSchema = z.object({
  imageUrl: z.string().url({ message: "La URL de la imagen no es válida" }),
});

export const resourcePriceFormSchema = z.object({
  price: z.string().min(1, { message: "El precio es obligatorio" }),
});
