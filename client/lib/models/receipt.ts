import { z } from "zod";

export type Receipt = {
  createdAt: Date;
  entries: ReceiptEntry[];
};

const entryTypeSchema = z
  .object({ value: z.literal("sell"), label: z.literal("بيع") })
  .or(z.object({ value: z.literal("buy"), label: z.literal("شراء") }))
  .or(z.object({ value: z.literal("transfer"), label: z.literal("تحويل") }))
  .or(z.object({ value: z.literal("expense"), label: z.literal("مصروف") }));

export type ReceiptEntryType = z.infer<typeof entryTypeSchema>;

export const entrySchema = z
  .object({
    amount: z.number().min(1, "المبلغ لا يمكن ان يكون اقل من 1"),
  })
  .extend({ type: entryTypeSchema });

export type ReceiptEntry = z.infer<typeof entrySchema>;
