import * as z from "zod";

export const NewMembershipFormSchema = z.object({
  userId: z.string().min(1, "El usuario es requerido"),
  type: z.string().min(1, "El tipo de membresía es requerido"),
  startDate: z.string().min(1, "La fecha de inicio es requerida"),
  endDate: z.string(),
  amount: z.string().min(1, "El monto es requerido"),
});

export const EditMembershipFormSchema = z.object({
  userId: z.string().min(1, "El usuario es requerido"),
  type: z.string().min(1, "El tipo de membresía es requerido"),
  startDate: z.string().min(1, "La fecha de inicio es requerida"),
  endDate: z.string(),
});