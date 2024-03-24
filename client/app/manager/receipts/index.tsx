import { View, Text, FlatList } from "react-native";
import React from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import dayjs from "dayjs";
import { Alphanumeric, Reciept } from "@/lib/components";
import { Entry, Receipt } from "@/lib/models";
import { LinearGradient } from "expo-linear-gradient";
import { fonts } from "@/lib/styles";
import { OptionsModal } from "./_components/OptionsModal";

export default function ManagerReciptsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "التحصيلات",
          ...options,
        }}
      />
      <View className="flex-1 bg-white pt-3">
        <Alphanumeric classes="text-center text-xl w-full">
          {dayjs().format("YYYY-MM-DD")}
        </Alphanumeric>
        <OptionsModal />

        <View className="flex-1 bg-slate-200 mt-6">
          <LinearGradient
            className="h-2"
            colors={["rgba(0,0,0,0.3)", "transparent"]}
          />
          <FlatList
            className="px-2 pt-4"
            ListFooterComponent={<View className="h-16" />}
            data={[
              receipt,
              receipt,
              receipt,
              receipt,
              receipt,
              receipt,
              receipt,
              receipt,
            ]}
            renderItem={({ item }) => <Reciept receipt={item} />}
            ItemSeparatorComponent={() => <View className="h-2" />}
            keyExtractor={(item) => item.id.toString()}
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

const receipt = {
  id: 1,
  total: 100,
  day_id: 1,
  location_id: 1,
  entries: [
    {
      value: 0,
      tax_type: "ضريبة",
      payment_type: "ضريبة",
      receipt_id: 1,
    } as Entry,
  ],
} as Receipt;
