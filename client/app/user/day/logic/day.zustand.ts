import { create } from "zustand";

type State = {
  day: Date | null;
  isOpen: boolean;
  day_id: number;
};

type Actions = {
  setDay: (day: Date, day_id: number) => void;
  closeDay: () => void;
};

export const useDayStore = create<State & Actions>((set) => ({
  day: null,
  isOpen: false,
  day_id: 0,
  setDay: (day, day_id) => set({ day, isOpen: true, day_id }),
  closeDay: () => set({ isOpen: false, day: null, day_id: 0 }),
}));
