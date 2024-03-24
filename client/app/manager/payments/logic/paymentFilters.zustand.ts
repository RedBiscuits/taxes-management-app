import { create } from "zustand";
import { PaymentFilters } from "./paymentFilters.schema";

type State = {
  filters: PaymentFilters;
};

type Actions = {
  setFilters: (filters: PaymentFilters) => void;
  resetFilters: () => void;
};

const initailState: PaymentFilters = {
  status: false,
  created_at: {
    value: undefined,
    status: false,
  },
  close_date: {
    value: undefined,
    status: false,
  },
};

export const usePaymentFilters = create<Actions & State>()((set) => ({
  filters: initailState,
  setFilters: (filters) => set({ filters }),
  resetFilters: () => set({ filters: { ...initailState } }),
}));
