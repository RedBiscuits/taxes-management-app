import { View } from "react-native";
import React, { ComponentProps } from "react";
import { Control, Controller, FieldPath, FieldValues } from "react-hook-form";
import { DropDown } from "./DropDown";
import { ErrorText } from "./ErrorText";

export default function ControlledDropDown<T extends FieldValues>({
  name,
  control,
  ...props
}: {
  name: FieldPath<T>;
  control: Control<T>;
} & Omit<ComponentProps<typeof DropDown>, "onChange">) {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange }, formState }) => {
          return (
            <>
              <DropDown
                {...props}
                onChange={onChange}
                // zindex={300}
                // zindexinverse={100}
                // items={taxTypesData}
              />
              <ErrorText>
                {(formState.errors[name]?.message as string) || null}
              </ErrorText>
            </>
          );
        }}
      />
    </View>
  );
}
