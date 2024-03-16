import { View } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/constants";
import { Button } from "@/lib/components";

export default function MainPaymentsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "اوامر التوريد",
          ...options,
        }}
      />
      <View className="flex-1 justify-center bg-white">
        <View>
          <Button
            text="تسجيل امر توريد"
            onPress={() => router.push("/user/payments/NewPayment")}
          />
          <Button
            text="تسديد امر توريد"
            onPress={() => router.push("/user/payments/PayPayment")}
          />
        </View>
      </View>
    </>
  );
}
