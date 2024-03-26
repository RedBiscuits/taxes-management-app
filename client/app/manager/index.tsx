import { View } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/constants";
import { Button } from "@/lib/components";

export default function MainUserScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "الرئيسة",
          ...options,
        }}
      />
      <View className="flex-1 justify-center bg-white">
        <View>
          <Button
            text="تقارير التحصيلات"
            onPress={() => router.push("/manager/receipts/")}
          />
          <Button
            text="تقارير اوامر التوريد"
            onPress={() => router.push("/manager/payments/")}
          />
          <Button text="المستهدف" />
        </View>
      </View>
    </>
  );
}
