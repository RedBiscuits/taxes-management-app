import React from "react";
import { Text, TextInput, View, Pressable } from "react-native";
import {
  useFonts,
  ElMessiri_400Regular,
  ElMessiri_700Bold,
} from "@expo-google-fonts/dev";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "@/lib/styles/fonts";

export default function LoginScreen() {
  let [fontsLoaded] = useFonts({
    ElMessiri_400Regular,
    ElMessiri_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView className="flex-1">
      <Text
        style={fonts.fontBold}
        className="text-center text-3xl text-slate-800"
      >
        تسجيل الدخول
      </Text>

      <View className="pt-6 px-4 space-y-5">
        <TextInput
          placeholderTextColor={"#64748b"}
          style={fonts.fontRegular}
          className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
          placeholder="البريد الإلكتروني"
        />
        <TextInput
          placeholderTextColor={"#64748b"}
          style={fonts.fontRegular}
          className="bg-slate-200 text-sky-900 rounded-2xl p-5 placeholder:text-xl"
          placeholder="كلمة المرور"
        />
      </View>
      <Text
        style={fonts.fontRegular}
        className=" px-6 text-sky-950 text-lg mt-6 underline"
      >
        نسيت كلمة المرور؟
      </Text>
      <Pressable className="bg-sky-600 rounded-2xl p-5 mx-4 mt-6 flex items-center">
        <Text style={fonts.fontBold} className="text-center text-white text-xl">
          تسجيل الدخول
        </Text>
      </Pressable>

      <Text style={fonts.fontRegular} className="text-center mt-10 text-lg">
        ليس لديك حساب ؟{" "}
        <Text className="underline text-sky-950">انشاء حساب</Text>
      </Text>
    </SafeAreaView>
  );
}
