import { View, Text, Modal } from "react-native";
import React from "react";
import { Button } from "@/lib/components";
import { fonts } from "@/lib/styles";

export function CallAdminModal({
  open,
  toggleModal,
}: {
  open: boolean;
  toggleModal: () => void;
}) {
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <View className="bg-white mx-4 p-6 h-80 flex justify-center rounded-lg absolute top-1/3">
          <Text
            style={fonts.fontArabicBold}
            className="text-xl text-center mb-6"
          >
            اذا نسيت كلمة السر او ليس لديك حساب يرجى الاتصال بالمسؤول
          </Text>
          <Button onPress={toggleModal} text="اغلاق" />
        </View>
      </View>
    </Modal>
  );
}
