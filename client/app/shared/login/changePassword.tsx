import React, { useState } from "react";
import { Text, View } from "react-native";
import { fonts } from "@/lib/styles/fonts";
import { Button } from "@/lib/components";
import { Stack } from "expo-router";
import { options } from "@/lib/constants/ScreenOptions";
import { ErrorText } from "@/lib/components/Form/ErrorText";
import { useChangePassword, useLogin } from "./logic/login.hooks";
import { ControlledInput } from "@/lib/components/Form/ControlledInput";
import SecureControlledInput from "@/lib/components/Form/SecureControlledInput";

export default function LoginScreen() {
  const { isPending, changePassword, formState, control } = useChangePassword();
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <>
      <Stack.Screen
        options={{
          title: "تغيير كلمة المرور",
          ...options,
        }}
      />
      <View className="pt-8 bg-white flex-1">
        <Text
          style={fonts.fontArabicBold}
          className="text-center text-3xl text-slate-800"
        >
          تغيير كلمة المرور
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
          <SecureControlledInput
            control={control}
            name="new_password"
            label="كلمة المرور الجديدة"
            placeholder="كلمة المرور الجديدة"
          />
          <SecureControlledInput
            control={control}
            name="new_password_confirmation"
            label="تأكيد كلمة المرور الجديدة "
            placeholder="تأكيد كلمة المرور الجديدة"
          />
        </View>
        <ErrorText>
          {formState.errors.root && formState.errors.root.message}
        </ErrorText>

        <Button loading={isPending} onPress={changePassword} text="تغيير" />
      </View>
    </>
  );
}
