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
              نوع التحصيل
            </Text>
            <Controller
              name="type"
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
            {errors.type && (
              <Text
                style={fonts.fontArabicRegular}
                className="text-red-600 text-center mt-2 text-lg"
              >
                {errors.type.message as string}
              </Text>
            )}
          </View>
          <View>
            <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
              نوع الضريبة
            </Text>
            <Controller
              name="type2"
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
            {errors.type2 && (
              <Text
                style={fonts.fontArabicRegular}
                className="text-red-600 text-center mt-2 text-lg"
              >
                {errors.type2.message as string}
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
              type: {
                value: data.type,
                label: taxTypes.find((item) => item.value === data.type)!.label,
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

const paymentTypes = [
  {
    value: "type1",
    label: "نقدي",
  },
  {
    value: "type2",
    label: "الكتروني - ماكينة",
  },
  {
    value: "type3",
    label: "الكتروني - مدفوعة مواطن",
  },
  {
    value: "type4",
    label: "الكتروني - تحويل بنكي",
  },
];

const taxTypes = [
  {
    value: "type1",
    label: "ضريبة مباني",
  },
  {
    value: "type2",
    label: "ضريبة أطيان",
  },
  {
    value: "type3",
    label: "ضريبة ملاهي",
  },
  {
    value: "type4",
    label: "كشف رسمي",
  },
  {
    value: "type5",
    label: "تامينات",
  },
  {
    value: "type6",
    label: "طعون",
  },
  {
    value: "type7",
    label: "مصاريف حجز",
  },
  {
    value: "type8",
    label: "مصاريف رفع حجز",
  },
  {
    value: "type9",
    label: "اعانة بر",
  },
  {
    value: "type10",
    label: "اعانة سينما",
  },
  {
    value: "type11",
    label: "طابع شهيد",
  },
  {
    value: "type12",
    label: "شرطة",
  },
  {
    value: "type13",
    label: "تنمية محلية",
  },
  {
    value: "type14",
    label: "رسم درن",
  },
  {
    value: "type15",
    label: "معاشات",
  },
];

export default AddEntryScreen;
