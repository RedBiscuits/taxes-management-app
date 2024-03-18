import React, { useState } from "react";
import { Text, View } from "react-native";
import { fonts } from "@/lib/styles/fonts";
import { Button } from "@/lib/components";
import { Stack } from "expo-router";
import { options } from "@/lib/constants/ScreenOptions";
import { ErrorText } from "@/lib/components/Form/ErrorText";
import { useLogin } from "./logic/login.hooks";
import { CallAdminModal } from "./_components/callAdminModal";
import { ControlledInput } from "@/lib/components/Form/ControlledInput";
import SecureControlledInput from "@/lib/components/Form/SecureControlledInput";

export default function LoginScreen() {
  const { isPending, login, formState, control } = useLogin();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <Stack.Screen
        options={{
          title: "تسجيل الدخول",
          ...options,
        }}
      />
      <View className="pt-8 bg-white flex-1">
        <Text
          style={fonts.fontArabicBold}
          className="text-center text-3xl text-slate-800"
        >
          تسجيل الدخول
        </Text>

        <View className="pt-6 px-4 space-y-5">
          <ControlledInput
            control={control}
            name="phone"
            label="رقم الهاتف"
            placeholder="رقم الهاتف"
            inputMode="tel"
          />
          <SecureControlledInput
            control={control}
            name="password"
            label="كلمة المرور"
            placeholder="كلمة المرور"
          />
        </View>
        <ErrorText>
          {formState.errors.root && formState.errors.root.message}
        </ErrorText>
        <Text
          onPress={toggleModal}
          style={fonts.fontArabicRegular}
          className=" px-6 text-sky-950 text-lg mt-6 underline"
        >
          نسيت كلمة المرور؟
        </Text>

        <Button loading={isPending} onPress={login} text="تسجيل الدخول" />
        <Text
          style={fonts.fontArabicRegular}
          className="text-center mt-10 text-lg"
        >
          ليس لديك حساب ؟
          <Text onPress={toggleModal} className="underline text-sky-950">
            انشاء حساب
          </Text>
        </Text>
      </View>
      <CallAdminModal open={isOpen} toggleModal={toggleModal} />
    </>
  );
}
