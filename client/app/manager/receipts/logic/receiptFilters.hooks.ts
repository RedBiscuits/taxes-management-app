import { useForm } from "react-hook-form";
import { initailState, useReceiptsFilters } from "./receiptsFilters.zustand";
import { ReceiptFilters, receiptFiltersSchema } from "./receiptsFilters.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export function useFilteredReceipts() {
  const { control, handleSubmit, watch } = useForm<ReceiptFilters>({
    resolver: zodResolver(receiptFiltersSchema),
    defaultValues: initailState,
  });
  const setFilters = useReceiptsFilters((s) => s.setFilters);

  return {
    control,
    setFilters: handleSubmit((data) => setFilters(data)),
    watch,
  };
}
