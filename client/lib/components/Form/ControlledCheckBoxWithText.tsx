import { View } from "react-native";
import React, { ComponentProps } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { ErrorText } from "./ErrorText";
import { CheckBoxWithText } from "./CheckBoxWithText";

export function ControlledCheckBoxWithText<T extends FieldValues>({
  name,
  control,
  ...props
}: {
  name: FieldPath<T>;
  control: Control<T>;
} & Omit<ComponentProps<typeof CheckBoxWithText>, "value" | "onChange">) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, formState }) => (
          <>
            <CheckBoxWithText value={value} onChange={onChange} {...props} />
            <ErrorText>
              {(formState.errors[name]?.message as string) || null}
            </ErrorText>
          </>
        )}
      />
    </View>
  );
}
