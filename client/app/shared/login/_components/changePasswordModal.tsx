import { View, Text, Modal } from "react-native";
import React from "react";
import { Button, Input } from "@/lib/components";
import { fonts } from "@/lib/styles";

export function ChangePasswordModal({
  open,
  toggleModal,
}: {
  open: boolean;
  toggleModal: () => void;
}) {
  return (
    <>
      <View className="flex-1 bg-black/50">
        <View className="  flex w-full justify-center absolute top-1/4">
          <View className="mx-4 bg-white p-6  rounded-lg">
            <Text
              style={fonts.fontArabicBold}
              className="text-xl text-center mb-6"
            >
              تغيير كلمة المرور
            </Text>
            <Input label="كلمة المرور الجديدة" />
            <View className="my-4" />
            <Input label="تأكيد كلمة المرور " />
            <Button text="تأكيد" className="mt-8 w-full mx-auto" />
          </View>
        </View>
      </View>
    </>
  );
}
