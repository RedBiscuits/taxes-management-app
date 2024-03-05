import React, { useState } from "react";
import DropDownPicker, {
  ItemType,
  ValueType,
} from "react-native-dropdown-picker";
import { fonts } from "@/lib/styles/fonts";

export const DropDown = (props: {
  onChange: (...event: any[]) => void;
  items: ItemType<ValueType>[];
  zindex?: number;
  zindexinverse?: number;
}) => {
  const [open, setOpen] = useState(false);
  const [pickerValue, setPickerValue] = useState(null);

  const { items, onChange } = props;

  return (
    <DropDownPicker
      open={open}
      setOpen={setOpen}
      value={pickerValue}
      setValue={setPickerValue}
      items={items}
      onChangeValue={onChange}
      style={[
        {
          borderWidth: 0,
          backgroundColor: "#e2e8f0",
          paddingVertical: 20,
        },
      ]}
      textStyle={[fonts.fontArabicRegular, { fontSize: 18, color: "#0c4a6e" }]}
      dropDownContainerStyle={{
        borderWidth: 0,
        backgroundColor: "#e2e8f0",
        paddingVertical: 20,
        elevation: 4,
      }}
      placeholder="اختر النوع"
      placeholderStyle={{
        color: "#64748b",
      }}
      zIndex={props.zindex}
      zIndexInverse={props.zindexinverse}
    />
  );
};
