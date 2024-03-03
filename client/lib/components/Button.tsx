import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { fonts } from "@/lib/styles/fonts";

const Button = ({
  text,
  loading,
  ...props
}: { text: string; loading?: boolean } & PressableProps) => {
  return (
    <Pressable
      className="bg-sky-600 rounded-2xl p-5 mx-4 mt-6 flex items-center"
      {...props}
    >
      {loading ? (
        <ActivityIndicator size={"large"} color={"#fff"} />
      ) : (
        <Text
          style={fonts.fontArabicBold}
          className="text-center text-white text-xl"
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default Button;
