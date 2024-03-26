import { z } from "zod";

export const receiptFiltersSchema = z.object({
  day_id: z.object({
    value: z.coerce.number().optional(),
    status: z.boolean(),
  }),
  payment_type: z.object({
    value: z.string().optional(),
    status: z.boolean(),
  }),
  tax_type: z.object({
    value: z.string().optional(),
    status: z.boolean(),
  }),
});

export type ReceiptFilters = z.infer<typeof receiptFiltersSchema>;
