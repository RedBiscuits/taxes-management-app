import { View, Text, TextProps } from "react-native";
import React from "react";
import { fonts } from "../styles/fonts";

export const ErrorText = (props: TextProps) => {
  return (
    <Text
      style={fonts.fontArabicRegular}
      className="text-red-600 text-center mt-2"
    >
      {props.children}
    </Text>
  );
};
