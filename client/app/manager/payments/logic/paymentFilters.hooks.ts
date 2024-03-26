import { useForm } from "react-hook-form";
import { initailState, usePaymentFilters } from "./paymentFilters.zustand";
import { PaymentFilters, paymentFiltersSchema } from "./paymentFilters.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useFilteredPayments() {
  const { control, handleSubmit, watch } = useForm<PaymentFilters>({
    resolver: zodResolver(paymentFiltersSchema),
    defaultValues: initailState,
  });
  const setFilters = usePaymentFilters((s) => s.setFilters);

  console.log("rerendering payments");

  return {
    control,
    setFilters: handleSubmit((data) => setFilters(data)),
    watch,
  };
}
