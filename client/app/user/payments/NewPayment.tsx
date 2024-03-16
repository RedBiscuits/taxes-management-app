import { View } from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/constants";
import { Button, DatePicker, Input } from "@/lib/components";

export default function NewPaymentsScreen() {
  const [date, setDate] = useState(new Date());
  return (
    <>
      <Stack.Screen
        options={{
          title: "تسجيل امر توريد",
          ...options,
        }}
      />
      <View className="flex-1 justify-center items-stretch px-2 bg-white">
        <Input label="رقم الهاتف" classes="mb-4" />
        <Input label="المبلغ" classes="mb-4" />
        <DatePicker
          date={date}
          setDate={setDate}
          label="التاريخ"
          classes="mb-4"
        />

        <Button text="تسجيل" className="" />
      </View>
    </>
  );
}
