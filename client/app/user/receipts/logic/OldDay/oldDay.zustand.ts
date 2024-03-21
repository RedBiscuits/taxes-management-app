import { Day } from "@/lib/models";
import { create } from "zustand";

type State = {
  day: Day | null;
};

type Actions = {
  clearDay: () => void;
  setDay: (day: Day) => void;
};

export const useOldDayStore = create<State & Actions>()((set) => ({
  day: null,
  clearDay: () => set({ day: null }),
  setDay: (day) => set({ day }),
}));
