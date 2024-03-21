import React, { useEffect, useState } from "react";
import { Stack } from "expo-router/stack";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Button } from "@/lib/components";
import { options } from "@/lib/constants/ScreenOptions";
import { View, Image } from "react-native";
import { getToken, getUser, setToken, setUser } from "@/lib/shared/storage";
export default function App() {
  useEffect(() => {
    (async () => {
      // await setToken("");
      // await setUser(null!);

      if (await getToken()) {
        const user = await getUser();
        router.push("/user/receipts/");

        // switch (user?.roles[0].name) {
        //   case "manager":
        //     router.push("/manager/");
        //     break;
        //   case "employee":
        //     router.push("/user/");
        //     break;

        //   default:
        //     console.log("unknown role");
        //     break;
        // }
      }
    })();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "الرئيسة",
          ...options,
          headerLeft: () => null,
        }}
      />
      <View className="flex-1 bg-neutral-50">
        <View className="w-72 h-72 mx-auto mt-32 mb-10">
          <Image
            source={require("@/assets/logo.png")}
            className="w-full h-full "
          />
        </View>

        <Button
          text="تسجيل الدخول"
          onPress={() => router.push("/shared/login/")}
        />
        <StatusBar style="light" />
      </View>
    </>
  );
}
