import React from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/constants/ScreenOptions";
import { View } from "react-native";
import { Fab, Button, Reciept } from "@/lib/components";
import { useReceiptStore } from "./logic/receipt.zustand";
import { useCustomMutation } from "@/lib/shared/query";
import { useQueryClient } from "@tanstack/react-query";
import { Receipt } from "@/lib/models";
import { getUser } from "@/lib/shared/storage";

const AddRecieptScreen = () => {
  const entries = useReceiptStore((state) => state.entries);
  const receipt_id = useReceiptStore((state) => state.receipt_id);
  const resetEntries = useReceiptStore((state) => state.resetReceipts);
  const receipt: Receipt = {
    created_at: new Date().toString(),
    entries,
  } as Receipt;

  const qc = useQueryClient();
  const { mutate, isPending } = useCustomMutation("entries", "post", {
    onSuccess: async () => {
      const user = await getUser();
      const locationId = user?.name.endsWith("1") ? 1 : 2;
      qc.invalidateQueries({
        queryKey: [`/receipts?location_id=${locationId}`],
      });
      resetEntries();
      router.back();
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: `ضريبة #${receipt_id}`,
          ...options,
        }}
      />

      <View className="relative flex-1 px-2 py-4 bg-white">
        <Reciept receipt={receipt} />
        <Button
          loading={isPending}
          text="حفظ"
          onPress={() =>
            mutate({
              entries: entries.map((e) => ({
                receipt_id,
                type: e.type,
                value: e.value,
              })),
            })
          }
        />
        <Fab onPress={() => router.push("/user/receipts/Add Entry")} />
      </View>
    </>
  );
};

export default AddRecieptScreen;
