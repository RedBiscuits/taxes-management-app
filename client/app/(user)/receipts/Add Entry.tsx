import React from "react";
import { Text, View } from "react-native";
import { fonts } from "@/lib/styles/fonts";
import { Button, DropDown, Input } from "@/lib/components";
import { Stack } from "expo-router";
import { options } from "@/lib/shared/ScreenOptions";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entry, entrySchema } from "./logic/receipt.schema";
import { router } from "expo-router";
import { paymentTypes, taxTypes } from "@/lib/shared/types";
import { Entry as ReceiptEntry } from "@/lib/models";
import { useReceiptStore } from "./logic/receipt.zustand";

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
      <View>
        <Text
          style={fonts.fontArabicBold}
          className="text-center text-3xl text-slate-800 mt-8"
        >
          اضف معاملة
        </Text>
        <View className="pt-6 px-4 space-y-5">
          <View>
            <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
              نوع الضريبة
            </Text>

            <Controller
              name="taxType"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <DropDown
                    zindex={300}
                    zindexinverse={100}
                    items={taxTypes}
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
            <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
              نوع التحصيل
            </Text>
            <Controller
              name="paymentType"
              control={control}
              render={({ field: { onChange } }) => {
                return (
                  <DropDown
                    zindex={200}
                    zindexinverse={200}
                    items={paymentTypes}
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
