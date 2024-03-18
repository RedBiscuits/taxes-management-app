import { View, Text } from "react-native";
import React, { ComponentProps, useState } from "react";
import { ControlledInput } from "./ControlledInput";
import Icon from "react-native-vector-icons/Entypo";
import { FieldValues } from "react-hook-form";

export default function SecureControlledInput<T extends FieldValues>(
  props: ComponentProps<typeof ControlledInput<T>>
) {
  const [secureText, setSecureText] = useState(true);

  return (
    <View className="relative">
      <ControlledInput secureTextEntry={secureText} {...props} />
      <Text
        className="absolute top-1/2 left-6"
        onPress={() => setSecureText(!secureText)}
      >
        <Icon name={secureText ? "eye-with-line" : "eye"} size={24} />
      </Text>
    </View>
  );
}
