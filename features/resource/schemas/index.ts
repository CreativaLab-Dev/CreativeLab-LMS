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


export const resourceLevelFormSchema = z.object({
  level: z.string().min(1, { message: "El nivel es obligatorio" }),
});

export const resourceUrlFormSchema = z.object({
  url: z.string().url({ message: "La URL no es válida" }),
});

export const resourceCategoryFormSchema = z.object({
  category: z.string().min(3, { message: "Categoria es obligatorio" }),
});
