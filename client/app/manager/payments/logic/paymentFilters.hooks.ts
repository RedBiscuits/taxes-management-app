import { useForm } from "react-hook-form";
import { usePaymentFilters } from "./paymentFilters.zustand";
import { PaymentFilters, paymentFiltersSchema } from "./paymentFilters.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useFilteredPayments() {
  const { control, handleSubmit, watch } = useForm<PaymentFilters>({
    resolver: zodResolver(paymentFiltersSchema),
  });
  const setFilters = usePaymentFilters((s) => s.setFilters);

  return {
    control,
    sitFilters: handleSubmit((data) => {
      setFilters(data);
    }),
  };
}
