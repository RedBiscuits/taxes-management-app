import React from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/shared/ScreenOptions";
import { View } from "react-native";
import Fab from "@/lib/components/Fab";
import Reciept from "@/lib/components/Reciept";
import { useReceiptStore } from "./receipt.zustand";
import Button from "@/lib/components/Button";
import { useCustomMutation } from "@/lib/shared/query";

const AddRecieptScreen = () => {
  const entries = useReceiptStore((state) => state.entries);
  const receipt_id = useReceiptStore((state) => state.receipt_id);
  const receipt = {
    createdAt: new Date(),
    entries,
  };

  const { mutate } = useCustomMutation("entries", "post", {
    onSuccess: (data: any) => {
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

      <View className="relative flex-1 px-2 py-4">
        <Reciept receipt={receipt} />
        <Button
          text="حفظ"
          onPress={() =>
            mutate({
              entries: entries.map((e) => ({
                receipt_id,
                type: e.type.value,
                value: e.amount,
              })),
            })
          }
        />
        <Fab onPress={() => router.push("/(user)/Add Entry")} />
      </View>
    </>
  );
};

export default AddRecieptScreen;
