import React from "react";
import { Stack } from "expo-router/stack";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Button from "@/lib/components/Button";
import { options } from "@/lib/shared/ScreenOptions";

const userType = "";

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
      <Button text="مستخدم" onPress={() => router.navigate("/(user)/home/")} />
      <Button
        text="ادمن"
        onPress={() => router.navigate("/dashboard/create account/")}
      />
      <StatusBar style="light" />
    </>
  );
}
