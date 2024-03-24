import { useForm } from "react-hook-form";
import { usePaymentFilters } from "./paymentFilters.zustand";
import { PaymentFilters, paymentFiltersSchema } from "./paymentFilters.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useFilteredPayments() {
  const { control, handleSubmit, watch, getValues } = useForm<PaymentFilters>({
    resolver: zodResolver(paymentFiltersSchema),
    defaultValues: {
      status: false,
      created_at: {
        value: new Date(),
        status: false,
      },
      close_date: {
        value: new Date(),
        status: false,
      },
    },
  });
  const setFilters = usePaymentFilters((s) => s.setFilters);

  console.log("watch", watch());

  return {
    control,
    setFilters: handleSubmit((data) => {
      console.log("filter data", JSON.stringify(data, null, 2));

      setFilters(data);
    }),
    getValues,
  };
}
