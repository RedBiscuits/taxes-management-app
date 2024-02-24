import React from "react";
import { Stack } from "expo-router/stack";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/lib/components/Button";
import { options } from "@/lib/shared/ScreenOptions";
import { Image, View } from "react-native";

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
        />

        <StatusBar style="light" />
      </View>
    </>
  );
}
