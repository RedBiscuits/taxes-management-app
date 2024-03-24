import { View, Text, Pressable } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { fonts } from "@/lib/styles/fonts";
import Icon from "react-native-vector-icons/Fontisto";
import dayjs from "dayjs";

export function DatePicker({
  date,
  setDate,
  onChange,
  label,
  classes,
  disabled = false,
}: {
  date: Date;
  setDate: Dispatch<SetStateAction<Date>>;
  onChange?: (...args: any[]) => void;
  label: string;
  classes?: string;
  disabled?: boolean;
}) {
  function showDatePicker() {
    DateTimePickerAndroid.open({
      value: date,
      onChange: (e, date) => {
        date && setDate(date);
        onChange && onChange(e, date);
      },
      mode: "date",
      is24Hour: false,
    });
  }

  return (
    <View className={classes}>
      <Text
        style={fonts.fontArabicSemi}
        className={`text-lg mr-3 mb-2 ${disabled ? "text-slate-400" : ""}`}
      >
        {label}
      </Text>
      <View className="bg-slate-200 flex items-end text-sky-900 border border-slate-300 relative rounded-2xl p-5">
        <Text
          style={fonts.poppinsRegular}
          className={`text-lg ${disabled ? "text-slate-400" : ""}`}
        >
          {dayjs(date).format("YYYY-MM-DD")}
        </Text>
      </View>
      <Pressable
        disabled={disabled}
        onPress={showDatePicker}
        className="left-3 top-1/2 translate-y-1 absolute"
      >
        <Icon name="date" size={20} color={disabled ? "#999" : "#444"} />
      </Pressable>
    </View>
  );
}
