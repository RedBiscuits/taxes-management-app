import React from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/shared/ScreenOptions";
import { View } from "react-native";
import Fab from "@/lib/components/Fab";
import Reciept from "@/lib/components/Reciept";
import { useReceiptStore } from "./receipt.zustand";
import Button from "@/lib/components/Button";

const AddRecieptScreen = () => {
  const entries = useReceiptStore((state) => state.entries);
  const receipt = {
    createdAt: new Date(),
    entries,
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: `فاتورة #${Math.floor(Math.random() * 100)}`,
          ...options,
        }}
      />

      <View className="relative flex-1 px-2 py-4">
        <Reciept receipt={receipt} />
        <Button text="حفظ" onPress={() => router.back()} />
        <Fab onPress={() => router.push("/(user)/Add Entry")} />
      </View>
    </>
  );
};

export default AddRecieptScreen;
