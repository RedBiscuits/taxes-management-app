import { Button, DropDown, Input } from "@/lib/components";
import { options } from "@/lib/constants/ScreenOptions";
import { paymentTypes, taxTypes } from "@/lib/constants";
import { Entry as ReceiptEntry } from "@/lib/models";
import { fonts } from "@/lib/styles/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { Entry, entrySchema } from "./logic/receipt.schema";
import { useReceiptStore } from "./logic/receipt.zustand";

const taxTypesData = taxTypes.map((type) => ({
  label: type,
  value: type,
}));

const paymentTypesData = paymentTypes.map((type) => ({
  label: type,
  value: type,
}));

const AddEntryScreen = () => {
  const addEntry = useReceiptStore((state) => state.addEntry);
  const receipt_id = useReceiptStore((state) => state.receipt_id);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Entry>({
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
          <View>
            <Controller
              name="taxType"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <DropDown
                    label="نوع الضريبة"
                    zindex={300}
                    zindexinverse={100}
                    items={taxTypesData}
                    onChange={onChange}
                  />
                );
              }}
            />
            {errors.taxType && (
              <Text
                style={fonts.fontArabicRegular}
                className="text-red-600 text-center mt-2 text-lg"
              >
                {errors.taxType.message as string}
              </Text>
            )}
          </View>
          <View>
            <Controller
              name="paymentType"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <DropDown
                    label="نوع التحصيل"
                    zindex={200}
                    zindexinverse={200}
                    items={paymentTypesData}
                    onChange={onChange}
                  />
                );
              }}
            />
            {errors.paymentType && (
              <Text
                style={fonts.fontArabicRegular}
                className="text-red-600 text-center mt-2 text-lg"
              >
                {errors.paymentType.message as string}
              </Text>
            )}
          </View>
          <View>
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <Input
                  label="المبلغ"
                  inputMode="decimal"
                  placeholder="المبلغ"
                  value={value ? String(value) : ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.amount && (
              <Text
                style={fonts.fontArabicRegular}
                className="text-red-600 text-center mt-2 text-lg"
              >
                {errors.amount.message}
              </Text>
            )}
          </View>
        </View>
        <Button
          onPress={handleSubmit((data) => {
            addEntry({
              receipt_id,
              type: data.taxType,
              value: Number(data.amount),
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
