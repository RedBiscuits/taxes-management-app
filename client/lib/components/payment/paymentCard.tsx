import { View, Text } from "react-native";
import React from "react";
import { Alphanumeric } from "../text";
import dayjs from "dayjs";
import { fonts } from "@/lib/styles/fonts";
import { Payment } from "@/lib/models";

// TODO:change to correct type
export function PaymentCard({
  phone,
  amount,
  created_at,
  close_data,
  elevation,
}: { elevation?: boolean } & Payment) {
  return (
    <View
      style={{
        elevation: elevation ? 4 : 0,
      }}
      className={`${elevation && "px-4"} py-6 rounded-xl bg-white m-2`}
    >
      <PaymentField label="رقم الهاتف" value={phone} />
      <PaymentField label="المبلغ" value={amount} />
      <PaymentField
        label="تاريخ الطلب"
        value={dayjs(created_at).format("DD/MM/YYYY")}
      />
      {close_data && (
        <PaymentField
          label="تاريخ السداد"
          value={dayjs(created_at).format("DD/MM/YYYY")}
        />
      )}
    </View>
  );
}

function PaymentField({ label, value }: any) {
  return (
    <View className="border border-slate-300 p-2 rounded-lg w-full my-1.5 flex flex-col items-end">
      <Text
        style={fonts.fontArabicSemi}
        className="text-base text-black/50 mb-1"
      >
        {label}
      </Text>
      <Alphanumeric
        numberStyles={fonts.poppinsSemibold}
        textStyles={fonts.fontArabicSemi}
        classes="text-xl"
      >
        {value}
      </Alphanumeric>
    </View>
  );
}
