import { create } from "zustand";
import { ReceiptFilters } from "./receiptsFilters.schema";

type State = {
  filters: ReceiptFilters;
};

type Actions = {
  setFilters: (filters: ReceiptFilters) => void;
  resetFilters: () => void;
};

export const initailState: ReceiptFilters = {
  day_id: {
    value: 0,
    status: false,
  },
  payment_type: {
    value: "",
    status: false,
  },
  tax_type: {
    value: "",
    status: false,
  },
};

export const useReceiptsFilters = create<Actions & State>()((set) => ({
  filters: { ...initailState },
  setFilters: (filters) => set({ filters }, true),
  resetFilters: () => set({ filters: { ...initailState } }, true),
}));
