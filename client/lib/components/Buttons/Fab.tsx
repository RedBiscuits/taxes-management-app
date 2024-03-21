import { Pressable, PressableProps } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";

export function Fab(props: PressableProps) {
  return (
    <Pressable
      android_ripple={{
        color: "#e0f2fe",
      }}
      className="absolute bottom-4 right-4 bg-sky-600 p-4 rounded-full"
      {...props}
    >
      <Icon name="plus" size={24} color={"#fff"} />
    </Pressable>
  );
}
