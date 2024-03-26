import React, { useState } from "react";
import DropDownPicker, {
  ItemType,
  ValueType,
} from "react-native-dropdown-picker";
import { fonts } from "@/lib/styles/fonts";
import { Text } from "react-native";

export const DropDown = (props: {
  onChange: (...event: any[]) => void;
  items: ItemType<ValueType>[];
  label: string;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  zindex?: number;
  zindexinverse?: number;
}) => {
  const [open, setOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(null);

  const { items, onChange, label, disabled, width, placeholder } = props;

  return (
    <>
      <Text
        style={fonts.fontArabicSemi}
        className={`text-lg mr-3 mb-2 ${disabled ? "text-slate-400" : ""}`}
      >
        {label}
      </Text>
      <DropDownPicker
        disabled={disabled}
        open={open}
        setOpen={setOpen}
        value={pickerValue}
        setValue={setPickerValue}
        items={items}
        onChangeValue={onChange}
        disabledStyle={{
          opacity: 0.5,
        }}
        style={[
          {
            borderWidth: 1,
            borderColor: "#cbd5e1",
            borderRadius: 14,
            backgroundColor: "#e2e8f0",
            paddingVertical: 20,
            ...(width ? { width: width } : {}),
          },
        ]}
        textStyle={[
          fonts.fontArabicRegular,
          { fontSize: 18, color: "#0c4a6e" },
        ]}
        dropDownContainerStyle={{
          borderWidth: 0,
          backgroundColor: "#e2e8f0",
          paddingVertical: 20,
          elevation: 4,
        }}
        placeholder={placeholder ?? "اختر النوع"}
        placeholderStyle={{
          color: "#64748b",
        }}
        zIndex={props.zindex}
        zIndexInverse={props.zindexinverse}
      />
    </>
  );
};
