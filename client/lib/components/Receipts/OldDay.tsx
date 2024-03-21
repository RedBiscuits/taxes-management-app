import { View, Text } from "react-native";
import React from "react";
import { Day } from "@/lib/models";
import { Alphanumeric } from "../text";

export function OldDay({ day: { time } }: { day: Day }) {
  return (
    <View className="flex flex-row justify-center mx-2 py-2 border-b-2 border-slate-200">
      <Alphanumeric classes="text-lg ">{time}</Alphanumeric>
    </View>
  );
}
