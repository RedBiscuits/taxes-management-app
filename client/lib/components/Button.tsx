import { Text, Pressable, PressableProps } from "react-native";
import React from "react";
import { fonts } from "../styles/fonts";

const Button = ({ text, ...props }: { text: string } & PressableProps) => {
  return (
    <Pressable
      className="bg-sky-600 rounded-2xl p-5 mx-4 mt-6 flex items-center"
      {...props}
    >
      <Text style={fonts.fontBold} className="text-center text-white text-xl">
        {text}
      </Text>
    </Pressable>
  );
};

export default Button;
