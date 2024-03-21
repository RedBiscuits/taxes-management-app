import { useToast } from "@/lib/components/toastModal/toastModal.zustand";
import { Entry, Receipt } from "@/lib/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCurrentReceipt() {
  const qc = useQueryClient();
  const { toast } = useToast();

  const currentReceipt = useQuery({
    queryKey: ["current_receipt"],
    queryFn: async () => {
      const currentReceipt = await AsyncStorage.getItem("current_receipt");
      if (!currentReceipt) throw new Error("no current receipt");
      return JSON.parse(currentReceipt) as Receipt;
    },
  });

  const addEntry = useMutation({
    mutationFn: async (entry: Entry) => {
      const currentReceipt = await AsyncStorage.getItem("current_receipt");
      if (!currentReceipt) throw new Error("no current receipt");
      console.log("current receipt", currentReceipt);

      const receipt = JSON.parse(currentReceipt) as Receipt;
      if (!receipt.entries) receipt.entries = [];
      receipt.entries.push(entry);
      await AsyncStorage.setItem("current_receipt", JSON.stringify(receipt));
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["current_receipt"] });
    },
    onError: (error) => {
      toast.error("حدث خطأ ما");
      console.log(error);
    },
  });

  const setCurrentReceipt = useMutation({
    mutationFn: async (receipt: Receipt | null) => {
      receipt
        ? await AsyncStorage.setItem("current_receipt", JSON.stringify(receipt))
        : await AsyncStorage.removeItem("current_receipt");
    },
    onSuccess: () => {
      console.log("invalidating");
      
      qc.invalidateQueries({ queryKey: ["current_receipt"] });
    },
    onError: (error) => {
      toast.error("حدث خطأ ما");
      console.log(error);
    },
  });

  return {
    currentReceipt: {
      get: () => currentReceipt.data,
      set: setCurrentReceipt.mutateAsync,
      addEntry: addEntry.mutate,
    },
  };
}
