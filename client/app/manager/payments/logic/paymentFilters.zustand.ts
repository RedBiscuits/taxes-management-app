import { create } from "zustand";
import { PaymentFilters } from "./paymentFilters.schema";

type State = {
  filters: PaymentFilters;
};

type Actions = {
  setFilters: (filters: PaymentFilters) => void;
  resetFilters: () => void;
};

export const initailState: PaymentFilters = {
  created_at: {
    value: new Date(),
    status: false,
  },
  created_at_2: {
    value: new Date(),
    status: false,
  },
  payed: false,
};

export const usePaymentFilters = create<Actions & State>()((set) => ({
  filters: { ...initailState },
  setFilters: (filters) => set({ filters }, true),
  resetFilters: () => set({ filters: { ...initailState } }, true),
}));
