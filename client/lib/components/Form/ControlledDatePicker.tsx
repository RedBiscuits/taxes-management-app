import { View, Text } from "react-native";
import React, { ComponentProps } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { DatePicker } from "./datePicker";

export function ControlledDatePicker<T extends FieldValues>({
  name,
  control,
  ...props
}: {
  name: FieldPath<T>;
  control: Control<T>;
} & Omit<ComponentProps<typeof DatePicker>, "date" | "setDate">) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { value, onChange } }) => (
          <DatePicker
            date={value || new Date()}
            setDate={onChange}
            {...props}
          />
        )}
      />
    </View>
  );
}
