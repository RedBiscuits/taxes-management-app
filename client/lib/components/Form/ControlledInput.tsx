import { View } from "react-native";
import React, { ComponentProps } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { ErrorText } from "./ErrorText";
import { Input } from "./Input";

export function ControlledInput<T extends FieldValues>({
  name,
  control,
  ...props
}: {
  name: FieldPath<T>;
  control: Control<T>;
} & ComponentProps<typeof Input>) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, onBlur }, formState }) => (
          <>
            <Input
              {...props}
              value={value}
              onBlur={onBlur}
              onChangeText={onChange}
            />
            <ErrorText>
              {(formState.errors[name]?.message as string) || null}
            </ErrorText>
          </>
        )}
      />
    </View>
  );
}
