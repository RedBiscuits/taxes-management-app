import { useToast } from "@/lib/components/toastModal/toastModal.zustand";
import { Entry, Receipt } from "@/lib/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export function useCurrentReceipt() {
  const qc = useQueryClient();
  const { toast } = useToast();

  const currentReceipt = useQuery({
    queryKey: ["current_receipt"],
    queryFn: async () => {
      const currentReceipt = await AsyncStorage.getItem("current_receipt");
      if (!currentReceipt) return null;
      return JSON.parse(currentReceipt) as Receipt;
    },
  });

  const addEntry = useMutation({
    mutationFn: async (entry: Entry) => {
      const currentReceipt = await AsyncStorage.getItem("current_receipt");
      if (!currentReceipt) return null;

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
    onSuccess: async () => {
      console.log("invalidating");

      await qc.refetchQueries({ queryKey: ["current_receipt"] });
      const data = qc.getQueryData(["current_receipt"]);

      console.log("data", JSON.stringify(data, null, 2));

      if (data) {
        console.log("redirecting to new reciept");
        router.push("/user/receipts/NewReciept");
      }
    },
    onError: (error) => {
      toast.error("حدث خطأ ما");
      console.log(error);
    },
  });

  return {
    currentReceipt: {
      get: () => currentReceipt.data,
      set: setCurrentReceipt.mutate,
      addEntry: addEntry.mutate,
    },
  };
}
