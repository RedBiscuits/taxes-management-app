import { FlatList, View, Text, Modal, ScrollView } from "react-native";
import React, { useState } from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import { Button, DatePicker, Input, PaymentCard } from "@/lib/components";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "@/lib/styles";

export default function PayPaymentScreen() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleModal = () => setIsOpen((x) => !x);
  return (
    <>
      <Stack.Screen
        options={{
          title: "تسديد امر توريد",
          ...options,
        }}
      />
      <View className="flex-1 bg-white">
        <Input label="رقم الهاتف" classes="mt-4 mx-2" />
        <View className="flex-1 bg-slate-200 mt-6">
          <LinearGradient
            className="h-2"
            colors={["rgba(0,0,0,0.3)", "transparent"]}
          />
          <FlatList
            data={[...items, ...items, ...items, ...items, ...items, ...items]}
            renderItem={({ item }) => (
              <PaymentCard elevation={true} {...item} />
            )}
            keyExtractor={(item) => item.phone}
            ListFooterComponent={() => <View className="h-10" />}
            ListEmptyComponent={() => (
              <View className="flex-1">
                <Text
                  style={fonts.fontArabicBold}
                  className="text-center text-xl mt-20"
                >
                  لا توجد بيانات
                </Text>
              </View>
            )}
          />
        </View>
        <ConfirmPaymentModal open={isOpen} toggleModal={toggleModal} />
      </View>
    </>
  );
}

const items = [
  {
    phone: "01000000000",
    amount: "1000",
    date: "2022-01-01",
    // endDate: "2022-01-01",
  },
];

function ConfirmPaymentModal({
  open,
  toggleModal,
}: {
  open: boolean;
  toggleModal: () => void;
}) {
  const [date, setDate] = useState(new Date());
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <View className="  flex w-full justify-center absolute top-32">
          <View className="mx-4 bg-white p-6  rounded-lg">
            <Text
              style={fonts.fontArabicBold}
              className="text-xl text-center mb-6"
            >
              تسديد امر توريد
            </Text>
            <PaymentCard {...items[0]} elevation={false} />
            <View className="my-2" />
            <DatePicker date={date} setDate={setDate} label="تاريخ التسديد" />
            <Button
              onPress={toggleModal}
              text="تأكيد"
              className="mt-8 w-full mx-auto"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
