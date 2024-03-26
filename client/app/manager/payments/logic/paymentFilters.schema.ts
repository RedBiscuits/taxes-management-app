import { z } from "zod";

export const paymentFiltersSchema = z.object({
  created_at: z.object({
    value: z.date().optional(),
    status: z.boolean(),
  }),
  created_at_2: z.object({
    value: z.date().optional(),
    status: z.boolean(),
  }),
  payed: z.boolean(),
});

export type PaymentFilters = z.infer<typeof paymentFiltersSchema>;
