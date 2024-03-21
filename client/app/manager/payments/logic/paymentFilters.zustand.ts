import { create } from "zustand";
import { PaymentFilters } from "./paymentFilters.schema";

type State = {
  filters: PaymentFilters;
};

type Actions = {
  setFilters: (filters: PaymentFilters) => void;
  resetFilters: () => void;
};

export const usePaymentFilters = create<Actions & State>((set) => ({
  filters: {
    status: false,
  },
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: { status: false } }),
}));
