import { View } from "react-native";
import React, { ComponentProps } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { ErrorText } from "./ErrorText";
import { Input } from "./Input";
import { CheckBox } from "./CheckBox";

export function ControlledCheckBox<T extends FieldValues>({
  name,
  control,
  ...props
}: {
  name: FieldPath<T>;
  control: Control<T>;
} & Omit<ComponentProps<typeof CheckBox>, "value" | "onChange">) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, formState }) => (
          <>
            <CheckBox value={value} onChange={onChange} {...props} />
            <ErrorText>
              {(formState.errors[name]?.message as string) || null}
            </ErrorText>
          </>
        )}
      />
    </View>
  );
}
