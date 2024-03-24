import React from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/constants/ScreenOptions";
import { View } from "react-native";
import { Fab, Button, Reciept } from "@/lib/components";
import { usePost } from "@/lib/shared/query";
import { useCurrentReceipt } from "./logic/receipts/receipt.hooks";
import { useToast } from "@/lib/components/toastModal/toastModal.zustand";

const AddRecieptScreen = () => {
  const { currentReceipt } = useCurrentReceipt();
  const currentReceiptData = currentReceipt.get();

  const { toast } = useToast();

  const { mutate, isPending } = usePost("entries", [["receipts"]], {
    onSuccess: () => {
      toast.success("تم حفظ التحصيل بنجاح");
      currentReceipt.set(null);
      router.back();
    },
    onError: (error) => {
      toast.error("حدث خطأ ما");
      console.log(error);
    },
  });

  if (!currentReceiptData) return router.push("/user/receipts/");

  return (
    <>
      <Stack.Screen
        options={{
          title: `تحصيل #${currentReceiptData?.id}`,
          ...options,
        }}
      />

      <View className="relative flex-1 px-2 py-4 bg-white">
        <Reciept receipt={currentReceiptData} />
        <Button
          loading={isPending}
          text="حفظ"
          onPress={async () => {
            mutate({
              entries: currentReceiptData.entries.map((e) => ({
                receipt_id: currentReceiptData.id,
                tax_type: e.tax_type,
                payment_type: e.payment_type,
                value: e.value,
              })),
            });
          }}
        />
        <Fab onPress={() => router.push("/user/receipts/NewEntry")} />
      </View>
    </>
  );
};

export default AddRecieptScreen;
