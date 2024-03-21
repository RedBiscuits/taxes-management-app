import { z } from "zod";

export const paymentFiltersSchema = z.object({
  status: z.boolean(),
  created_at: z.date().optional(),
  closeDate: z.date().optional(),
});

export type PaymentFilters = z.infer<typeof paymentFiltersSchema>;
