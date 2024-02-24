import { ReceiptEntry } from "@/lib/models/receipt";
import { create } from "zustand";

type State = {
  entries: ReceiptEntry[];
};

type Actions = {
  resetReceipts: () => void;
  addEntry: (entry: ReceiptEntry) => void;
};

export const useReceiptStore = create<State & Actions>((set) => ({
  entries: [],
  resetReceipts: () => set({ entries: [] }),
  addEntry: (entry) => set((state) => ({ entries: [...state.entries, entry] })),
}));
