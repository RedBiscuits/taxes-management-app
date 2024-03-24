import { z } from "zod";

export const paymentFiltersSchema = z.object({
  status: z.boolean(),
  created_at: z.object({
    value: z.date().optional(),
    status: z.boolean(),
  }),
  close_date: z.object({
    value: z.date().optional(),
    status: z.boolean(),
  }),
});

export type PaymentFilters = z.infer<typeof paymentFiltersSchema>;
