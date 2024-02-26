import { Text, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import { router } from "expo-router";

const BackButton = () => {
  return (
    <Pressable onPress={() => router.canGoBack() && router.back()}>
      <Text>
        <Icon name="arrowleft" size={24} color={"#fff"} />,
      </Text>
    </Pressable>
  );
};

export default BackButton;
