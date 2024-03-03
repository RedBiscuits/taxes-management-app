import { z } from "zod";

export const entrySchema = z.object({
  amount: z.coerce
    .number({
      required_error: "المبلغ مطلوب",
      invalid_type_error: "المبلغ مطلوب",
    })
    .min(1, "المبلغ لا يمكن ان يكون اقل من 1"),
  type: z.any(),
  type2: z.any(),


  //   z.enum(["sell", "buy", "transfer", "expense"], {
  //   required_error: "نوع المعاملة مطلوب",
  //   invalid_type_error: "نوع المعاملة مطلوب",
  // }),
});

export type Entry = z.infer<typeof entrySchema>;
