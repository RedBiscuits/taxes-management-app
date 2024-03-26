import { z } from "zod";

export const paymentSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "المبلغ مطلوب",
      invalid_type_error: "المبلغ مطلوب",
    })
    .min(1, "المبلغ مطلوب"),
  phone: z
    .string({
      required_error: "رقم الهاتف مطلوب",
      invalid_type_error: "رقم الهاتف مطلوب",
    })
    .regex(/^01[0125]\d{8}$/, "رقم الهاتف غير صحيح"),
  created_at: z.date({
    required_error: "التاريخ مطلوب",
    invalid_type_error: "التاريخ مطلوب",
  }),
});

export type PaymentData = z.infer<typeof paymentSchema>;
