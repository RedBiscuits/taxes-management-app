import { View, Text, Pressable } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { fonts, colors } from "@/lib/styles";

export default function CheckBox({
  children,
  onChange,
}: {
  children: string;
  onChange?: (isChecked: boolean) => void;
}) {
  let checkBoxRef: BouncyCheckbox | null = null;

  return (
    <View className="flex flex-row justify-between items-center">
      <BouncyCheckbox
        fillColor={colors.primary_blue}
        iconStyle={{
          borderRadius: 6,
        }}
        innerIconStyle={{
          borderRadius: 6,
        }}
        ref={(r) => (checkBoxRef = r)}
        onPress={onChange}
      />
      <Pressable className="flex-1" onPress={() => checkBoxRef?.onPress()}>
        <Text className="text-lg" style={fonts.fontArabicSemi}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}
