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
            text="التحصيلات"
            onPress={() => router.push("/user/receipts/")}
          />
          <Button
            text="اوامر التوريد"
            onPress={() => router.push("/user/payments/")}
          />
          <Button
            text="المستهدف"
            onPress={() => router.push("/user/target/")}
          />
        </View>
      </View>
    </>
  );
}
