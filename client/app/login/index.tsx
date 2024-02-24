import React from "react";
import { Text, TextInput, View } from "react-native";
import { fonts } from "@/lib/styles/fonts";
import Button from "@/lib/components/Button";
import { Stack, router } from "expo-router";
import { options } from "@/lib/shared/ScreenOptions";

export default function LoginScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "تسجيل الدخول",
          ...options,
        }}
      />
      <View className="pt-8">
        <Text
          style={fonts.fontArabicBold}
          className="text-center text-3xl text-slate-800"
        >
          تسجيل الدخول
        </Text>

        <View className="pt-6 px-4 space-y-5">
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontArabicRegular}
            className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
            placeholder="البريد الإلكتروني"
          />
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontArabicRegular}
            className="bg-slate-200 text-sky-900 rounded-2xl p-5 placeholder:text-xl"
            placeholder="كلمة المرور"
          />
        </View>
        <Text
          style={fonts.fontArabicRegular}
          className=" px-6 text-sky-950 text-lg mt-6 underline"
        >
          نسيت كلمة المرور؟
        </Text>

        <Button text="تسجيل الدخول" />
        <Text
          style={fonts.fontArabicRegular}
          className="text-center mt-10 text-lg"
        >
          ليس لديك حساب ؟{" "}
          <Text className="underline text-sky-950">انشاء حساب</Text>
        </Text>

        <Button
          text="مستخدم"
          onPress={() => router.navigate("/(user)/home/")}
        />
        <Button
          text="ادمن"
          onPress={() => router.navigate("/dashboard/create account/")}
        />
      </View>
    </>
  );
}
