import { View, Text, Pressable } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { fonts, colors } from "@/lib/styles";

export function CheckBoxWithText({
  children,
  onChange,
  value,
  classes,
}: {
  children: string;
  onChange?: (isChecked: boolean) => void;
  value: boolean;
  classes: string;
}) {
  let checkBoxRef: BouncyCheckbox | null = null;

  return (
    <View className={`flex flex-row justify-between items-center ${classes}`}>
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
        isChecked={value}
      />
      <Pressable className="flex-1" onPress={() => checkBoxRef?.onPress()}>
        <Text className="text-lg" style={fonts.fontArabicSemi}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}
