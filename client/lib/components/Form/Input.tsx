import { Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { fonts } from "../../styles/fonts";

export const Input = ({
  label,
  classes,
  ...props
}: { label: string; classes?: string } & TextInputProps) => {
  return (
    <View className={classes}>
      <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
        {label}
      </Text>
      <TextInput
        placeholder={label}
        placeholderTextColor={"#64748b"}
        style={fonts.fontArabicRegular}
        className={`bg-slate-200 text-sky-900 border-slate-300 border  rounded-2xl p-5 placeholder:text-xl placeholder:text-right `}
        {...props}
      />
    </View>
  );
};
