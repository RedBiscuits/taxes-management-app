import { ReceiptEntry } from "@/lib/models/receipt";
import { create } from "zustand";

type State = {
  receipt_id: number;
  entries: ReceiptEntry[];
};

type Actions = {
  createReceipt: (receipt_id: number) => void;
  resetReceipts: () => void;
  addEntry: (entry: ReceiptEntry) => void;
};

export const useReceiptStore = create<State & Actions>((set) => ({
  entries: [],
  receipt_id: 0,
  createReceipt: (receipt_id: number) => set({ receipt_id }),
  resetReceipts: () => set({ entries: [], receipt_id: 0 }),
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
}));
