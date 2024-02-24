import { View, Text } from "react-native";
import React from "react";
import { Receipt } from "@/lib/models/receipt";
import { fonts } from "@/lib/styles/fonts";

export default function Reciept({
  receipt: { createdAt, entries },
}: {
  receipt: Receipt;
}) {
  return (
    <View className="bg-slate-200 rounded-xl p-4 space-y-2">
      <View className="flex flex-row items-center justify-between">
        <Text className="text" style={fonts.fontSansRegular}>
          {createdAt.toLocaleDateString()}
        </Text>
        <Text className="text" style={fonts.fontSansRegular}>
          {createdAt.toLocaleTimeString()}
        </Text>
      </View>
      <View className="h-px bg-sky-950 mb-2" />

      <View className="space-y-2">
        {entries.map((entry) => (
          <View className="flex flex-row items-center justify-between">
            <Text className="text-lg" style={fonts.fontArabicRegular}>
              {entry.amount.toFixed(2)} جنيه
            </Text>
            <Text className="text-lg" style={fonts.fontArabicRegular}>
              {entry.type.label}
            </Text>
          </View>
        ))}
        <View className="h-px bg-sky-950 mt-2" />

        <View className="flex flex-row items-center justify-between">
          <Text className="text-lg" style={fonts.fontArabicRegular}>
            {entries.reduce((acc, { amount }) => acc + amount, 0).toFixed(2)}{" "}
            جنيه
          </Text>
          <Text className="text-lg" style={fonts.fontArabicRegular}>
            الاجمالي
          </Text>
        </View>
      </View>
    </View>
  );
}
