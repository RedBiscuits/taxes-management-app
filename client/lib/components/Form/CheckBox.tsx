import { View } from "react-native";
import React from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { colors } from "@/lib/styles";

export function CheckBox({
  onChange,
  value,
  classes,
}: {
  onChange?: (isChecked: boolean) => void;
  value: boolean;
  classes?: string;
}) {
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
        onPress={onChange}
        isChecked={value}
      />
    </View>
  );
}
