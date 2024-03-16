import { FlatList, View, Text, Modal } from "react-native";
import React, { useState } from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import { Button, DatePicker, Input, PaymentCard } from "@/lib/components";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "@/lib/styles";
import { OptionsModal } from "./_components/OptionsModal";

export default function MainManagerPaymentsScreen() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleModal = () => setIsOpen((x) => !x);
  return (
    <>
      <Stack.Screen
        options={{
          title: "تقارير اوامر التوريد",
          ...options,
        }}
      />
      <View className="flex-1 bg-white">
        <Input label="رقم الهاتف" classes="mt-4 mx-2" />
        <OptionsModal />
        <View className="flex-1 bg-slate-200 mt-6">
          <LinearGradient
            className="h-2"
            colors={["rgba(0,0,0,0.3)", "transparent"]}
          />
          <FlatList
            data={[...items, ...items, ...items, ...items, ...items, ...items]}
            renderItem={({ item }) => <PaymentCard elevation {...item} />}
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
      </View>
    </>
  );
}

const items = [
  {
    phone: "01000000000",
    amount: "1000",
    date: "2022-01-01",
    endDate: "2022-01-01",
  },
];
