import { View, Text } from "react-native";
import React from "react";
import { Receipt } from "@/lib/models";
import { fonts } from "@/lib/styles/fonts";
import dayjs from "dayjs";
import { Alphanumeric } from "../text";

export function Reciept({
  receipt: { created_at, entries, total },
}: {
  receipt: Receipt;
}) {
  const receipt_entries =
    !!entries?.length &&
    entries.map(({ id, type, value }) => (
      <View key={id} className="flex flex-row items-center justify-between">
        <Alphanumeric className="text-lg" numberStyles={fonts.poppinsSemibold}>
          جنيه
          {value.toFixed(2)}
        </Alphanumeric>
        <View>
          <Text className="text-lg" style={fonts.fontArabicRegular}>
            {type || "ضريبة"}
          </Text>
          {/* TODO:fix this add the correc ttype to the ts type */}
          <Text
            className="text-sm text-black/60"
            style={fonts.fontArabicRegular}
          >
            {type || "ضريبة"}
          </Text>
        </View>
      </View>
    ));

  const recieptTotal =
    total?.toFixed(2) ||
    entries?.reduce((a, b) => a + b.value, 0).toFixed(2) ||
    0;

  return (
    <View
      style={{
        elevation: 4,
      }}
      className="bg-white rounded-xl p-4 space-y-2"
    >
      <View className="flex flex-row items-center justify-center">
        <Text className="text-lg" style={fonts.poppinsSemibold}>
          {dayjs(created_at).format("DD/MM/YYYY")}
        </Text>
      </View>
      <View className="h-px bg-black/10 my-2 " />

      {receipt_entries && (
        <View className="space-y-2">
          {receipt_entries}
          <View className="h-px bg-black/10 my-2" />

          <View className="flex flex-row items-center justify-between">
            <Alphanumeric
              className="text-lg"
              numberStyles={fonts.poppinsSemibold}
            >
              جنيه
              {recieptTotal}
            </Alphanumeric>
            <Text className="text-lg" style={fonts.fontArabicRegular}>
              الاجمالي
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

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
