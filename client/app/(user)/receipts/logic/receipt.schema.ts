import { paymentTypes, taxTypes } from "@/lib/constants";
import { z } from "zod";

export const entrySchema = z.object({
  amount: z.coerce
    .number({
      required_error: "المبلغ مطلوب",
      invalid_type_error: "المبلغ مطلوب",
    })
    .min(1, "المبلغ لا يمكن ان يكون اقل من 1"),
  taxType: z.enum(taxTypes, {
    required_error: "نوع الضريبة مطلوب",
    invalid_type_error: "نوع الضريبة مطلوب",
  }),
  paymentType: z.enum(paymentTypes, {
    required_error: "طريقة الدفع مطلوبة",
    invalid_type_error: "طريقة الدفع مطلوبة",
  }),
});

export type Entry = z.infer<typeof entrySchema>;
