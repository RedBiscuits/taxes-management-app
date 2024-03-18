import { create } from "zustand";

type State = {
  isOpen: boolean;
  type: "success" | "error";
  message: string;
};

type Actions = {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    close: () => void;
  };
};

export const useToast = create<State & Actions>((set) => ({
  isOpen: true,
  type: "success",
  message: "تم التحقق من البريد الالكتروني",
  toast: {
    success: (message) => set({ isOpen: true, type: "success", message }),
    error: (message) => set({ isOpen: true, type: "error", message }),
    close: () => set({ isOpen: false, type: "success", message: "" }),
  },
}));
