import { View } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { options } from "@/lib/constants";
import { Button, DatePicker } from "@/lib/components";
import { ControlledInput } from "@/lib/components/Form/ControlledInput";
import { usePayment } from "./logic/payment.hooks";

export default function NewPaymentsScreen() {
  // const [date, setDate] = useState(new Date());

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

        {/* <DatePicker
          date={date}
          setDate={setDate}
          label="التاريخ"
          classes="mb-4"
        /> */}

        <Button
          loading={isPending}
          onPress={addPayment}
          text="تسجيل"
          className=""
        />
      </View>
    </>
  );
}
