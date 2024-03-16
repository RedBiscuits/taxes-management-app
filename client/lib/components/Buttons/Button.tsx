import {
  Text,
  Pressable,
  PressableProps,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { fonts } from "@/lib/styles/fonts";

export const Button = ({
  text,
  loading,
  children,
  ...props
}: { text: string; loading?: boolean } & PressableProps) => {
  return (
    <Pressable
      disabled={loading}
      android_ripple={{
        color: "#e0f2fe",
      }}
      className="bg-sky-600 rounded-2xl p-5 mx-4 mt-6 flex items-center"
      {...props}
    >
      {loading ? (
        <ActivityIndicator className="w-6 h-6" size={"large"} color={"#fff"} />
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
