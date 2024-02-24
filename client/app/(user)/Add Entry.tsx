import React from "react";
import { Text, View } from "react-native";
import { fonts } from "@/lib/styles/fonts";
import Button from "@/lib/components/Button";
import { Stack } from "expo-router";
import { options } from "@/lib/shared/ScreenOptions";
import { ReceiptEntryType } from "@/lib/models/receipt";
import { useReceiptStore } from "./receipt.zustand";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Entry, entrySchema } from "./receipt.schema";
import { router } from "expo-router";
import DropDown from "@/lib/components/DropDown";
import Input from "@/lib/components/Input";

const AddEntryScreen = () => {
  const addEntry = useReceiptStore((state) => state.addEntry);

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
          title: "اضف معاملة",
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
              النوع
            </Text>
            <Controller
              name="type"
              control={control}
              render={({ field: { onChange } }) => {
                return <DropDown items={baseTypes} onChange={onChange} />;
              }}
            />
            {errors.type && (
              <Text
                style={fonts.fontArabicRegular}
                className="text-red-600 text-center mt-2 text-lg"
              >
                {errors.type.message}
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
              type: {
                value: data.type,
                label: baseTypes.find((item) => item.value === data.type)!
                  .label,
              } as ReceiptEntryType,
              amount: Number(data.amount),
            });
            router.back();
          })}
          className="mt-10"
          text="حفظ"
        />
      </View>
    </>
  );
};

const baseTypes = [
  {
    value: "sell",
    label: "بيع",
  },
  {
    value: "buy",
    label: "شراء",
  },
  {
    value: "transfer",
    label: "تحويل",
  },
  {
    value: "expense",
    label: "مصروف",
  },
];

export default AddEntryScreen;
