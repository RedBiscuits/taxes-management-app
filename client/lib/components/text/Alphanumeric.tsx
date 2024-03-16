import { View, Text, TextProps, StyleProp, TextStyle } from "react-native";
import React from "react";
import { fonts } from "@/lib/styles/fonts";

type ChildrenText = string | number | (string | number)[];
type AlphanumericProps = TextProps & {
  classes?: string;
  children: ChildrenText;
  textStyles?: StyleProp<TextStyle>;
  numberStyles?: StyleProp<TextStyle>;
};

export function Alphanumeric(props: AlphanumericProps) {
  return (
    <View className="flex flex-row gap-1">
      {formatChildren(props.children, props)}
    </View>
  );
}
const formatChildren = (text: ChildrenText, props: AlphanumericProps) => {
  const { textStyles, numberStyles, classes } = props;

  if (Array.isArray(text)) {
    text = text.join(" ");
  }

  if (
    typeof text === "string" &&
    consistsOfNumbersAndSpecialCharactersOnly(text)
  ) {
    return (
      <Text
        {...props}
        className={`${classes}`}
        style={numberStyles ?? fonts.poppinsSemibold}
      >
        {text}
      </Text>
    );
  } else {
    return String(text)
      .split(" ")
      .map((chunk, i) => (
        <Text
          key={i}
          {...props}
          className={`${classes}`}
          style={
            isNaN(Number(chunk))
              ? textStyles ?? fonts.fontArabicBold
              : numberStyles ?? fonts.poppinsSemibold
          }
        >
          {chunk}
        </Text>
      ));
  }
};

const consistsOfNumbersAndSpecialCharactersOnly = (str: string) =>
  /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(str);
