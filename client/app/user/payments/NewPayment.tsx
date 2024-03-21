import { View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { options } from "@/lib/constants";
import {
  ControlledInput,
  ControlledDatePicker,
  Button,
} from "@/lib/components";
import { usePayment } from "./logic/payment.hooks";

export default function NewPaymentsScreen() {
  const { control, isPending, addPayment } = usePayment();

  return (
    <>
      <Stack.Screen
        options={{
          title: "تسجيل امر توريد",
          ...options,
        }}
      />
      <View className="flex-1 justify-center items-stretch px-2 bg-white">
        <ControlledInput
          control={control}
          name="phone"
          label="رقم الهاتف"
          placeholder="رقم الهاتف"
          inputMode="tel"
        />
        <ControlledInput
          control={control}
          name="amount"
          label="المبلغ"
          placeholder="المبلغ"
          inputMode="decimal"
        />

        <ControlledDatePicker
          control={control}
          name="date"
          label="التاريخ"
          classes="mb-4"
        />

        <Button loading={isPending} onPress={addPayment} text="تسجيل" />
      </View>
    </>
  );
}
