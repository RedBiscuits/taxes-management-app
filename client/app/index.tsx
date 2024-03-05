import React from "react";
import { Stack } from "expo-router/stack";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button } from "@/lib/components";
import { options } from "@/lib/constants/ScreenOptions";
import { View, Image } from "react-native";
export default function App() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "الرئيسة",
          ...options,
          headerLeft: () => null,
        }}
      />
      <View className="flex-1 bg-white">
        <View className="w-72 h-72 mx-auto mt-32 mb-10">
          <Image
            source={require("@/assets/logo.png")}
            className="w-full h-full"
          />
        </View>

        <Button
          text="تسجيل الدخول"
          onPress={() => router.navigate("/login/")}
          // onPress={() => router.push("/(admin)/dashboard/reports/")}
        />

        <StatusBar style="light" />
      </View>
    </>
  );
}
