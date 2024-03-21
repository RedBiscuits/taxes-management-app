import { Button, ControlledInput, DropDown, Input } from "@/lib/components";
import { options } from "@/lib/constants/ScreenOptions";
import { paymentTypes, taxTypes } from "@/lib/constants";
import { Entry as ReceiptEntry } from "@/lib/models";
import { fonts } from "@/lib/styles/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Entry, entrySchema } from "./logic/receipts/receipt.schema";
import ControlledDropDown from "@/lib/components/Form/ControlledDropDown";
import { useCurrentReceipt } from "./logic/receipts/receipt.hooks";

const taxTypesData = taxTypes.map((type) => ({
  label: type,
  value: type,
}));

const paymentTypesData = paymentTypes.map((type) => ({
  label: type,
  value: type,
}));

const AddEntryScreen = () => {
  const { currentReceipt } = useCurrentReceipt();
  const currentReceiptData = currentReceipt.get();
  if (!currentReceiptData) return router.push("/user/receipts/");

  const { control, handleSubmit } = useForm<Entry>({
    resolver: zodResolver(entrySchema),
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "اضف تحصيل",
          ...options,
        }}
      />
      <View className="bg-white">
        <Text
          style={fonts.fontArabicBold}
          className="text-center text-3xl text-slate-800 mt-8"
        >
          اضف معاملة
        </Text>
        <View className="pt-6 px-4 space-y-5">
          <ControlledDropDown
            name="taxType"
            control={control}
            label="نوع الضريبة"
            zindex={300}
            zindexinverse={100}
            items={taxTypesData}
          />
          <ControlledDropDown
            name="paymentType"
            control={control}
            label="نوع التحصيل"
            zindex={200}
            zindexinverse={200}
            items={paymentTypesData}
          />

          <ControlledInput
            name="amount"
            control={control}
            label="المبلغ"
            inputMode="decimal"
            placeholder="المبلغ"
          />
        </View>
        <Button
          onPress={handleSubmit((data) => {
            currentReceipt.addEntry({
              receipt_id: currentReceiptData.id,
              tax_type: data.taxType,
              payment_type: data.paymentType,
              value: Number(data.amount),
              id: Math.random(),
            } as ReceiptEntry);
            router.back();
          })}
          className="mt-10"
          text="حفظ"
        />
      </View>
    </>
  );
};

export default AddEntryScreen;
