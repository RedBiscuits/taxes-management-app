import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { fonts } from "@/lib/styles";
import { DatePicker, Button } from "@/lib/components";
import CheckBox from "@/lib/components/Form/CheckBox";
import { router } from "expo-router";

export function DatePickerModal({
  type,
  open,
  toggleModal,
  date,
  setDate,
}: any) {
  const isOld = type === "old";

  return (
    <>
      <Modal visible={open} transparent animationType="fade">
        <View className="flex-1 bg-black/50">
          <View className="  flex w-full justify-center absolute top-1/3">
            <View className="mx-4 bg-white p-6  rounded-lg">
              <Text
                style={fonts.fontArabicBold}
                className="text-xl text-center mb-6"
              >
                {isOld ? "تاريخ اليومية القديمة" : "تاريخ اليومية الجديدة"}
              </Text>
              <View className="my-2" />
              <DatePicker
                date={date}
                setDate={setDate}
                label="التاريخ"
                classes="mb-4"
              />
              <Button
                onPress={() => {
                  toggleModal();
                  isOld
                    ? router.push("/user/receipts/OldReceipts")
                    : router.push("/user/receipts/NewReceipts");
                }}
                text="تأكيد"
                className="mt-8 w-full mx-auto"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
