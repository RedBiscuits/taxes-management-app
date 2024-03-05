import { Entry } from "@/lib/models";
import { create } from "zustand";

type State = {
  receipt_id: number;
  entries: Entry[];
};

type Actions = {
  createReceipt: (receipt_id: number) => void;
  resetReceipts: () => void;
  addEntry: (entry: Entry) => void;
};

export const useReceiptStore = create<State & Actions>((set) => ({
  entries: [],
  receipt_id: 0,
  createReceipt: (receipt_id: number) => set({ receipt_id }),
  resetReceipts: () => set({ entries: [], receipt_id: 0 }),
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
}));
