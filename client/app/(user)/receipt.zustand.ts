import { ReceiptEntry } from "@/lib/models/receipt";
import { create } from "zustand";

type State = {
  entries: ReceiptEntry[];
};

type Actions = {
  resetReceipts: () => void;
  addReceipt: (entry: ReceiptEntry) => void;
};

export const useReceiptStore = create<State & Actions>((set) => ({
  entries: [],
  resetReceipts: () => set({ entries: [] }),
  addReceipt: (entry) =>
    set((state) => ({ entries: [...state.entries, entry] })),
}));
