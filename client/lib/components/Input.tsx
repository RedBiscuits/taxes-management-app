import { Text, TextInput, TextInputProps, View } from "react-native";
import React from "react";
import { fonts } from "../styles/fonts";

const Input = ({ label, ...props }: { label: string } & TextInputProps) => {
  return (
    <View>
      <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
        {label}
      </Text>
      <TextInput
        placeholderTextColor={"#64748b"}
        style={fonts.fontArabicRegular}
        className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl placeholder:text-right"
        {...props}
      />
    </View>
  );
};

export default Input;
