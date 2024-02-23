import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { fonts } from "@/lib/styles/fonts";
import DropDownPicker from "react-native-dropdown-picker";
import Button from "@/lib/components/Button";
import { Stack } from "expo-router";
import { options } from "@/lib/shared/ScreenOptions";
import { ReceiptEntry, ReceiptEntryType } from "@/lib/models/receipt";
import { useReceiptStore } from "./receipt.zustand";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { entrySchema } from "@/lib/models/receipt";

const AddEntryScreen = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [amount, setAmount] = useState<string>();

  const addEntry = useReceiptStore((state) => state.addReceipt);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ReceiptEntry>({
    resolver: zodResolver(entrySchema),
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "اضف معاملة",
          ...options,
        }}
      />
      <View>
        <Text
          style={fonts.fontBold}
          className="text-center text-3xl text-slate-800 mt-8"
        >
          اضف معاملة
        </Text>
        <View className="pt-6 px-4 space-y-5">
          <View>
            <Text style={fonts.fontSemi} className="text-lg mr-3 mb-2">
              النوع
            </Text>
            <DropDownPicker
              style={[
                {
                  borderWidth: 0,
                  backgroundColor: "#e2e8f0",
                  paddingVertical: 20,
                },
              ]}
              textStyle={[
                fonts.fontRegular,
                { fontSize: 18, color: "#0c4a6e" },
              ]}
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
              open={open}
              value={value}
              items={baseTypes}
              setOpen={setOpen}
              setValue={setValue}
            />
          </View>
          <View>
            <Text style={fonts.fontSemi} className="text-lg mr-3 mb-2">
              المبلغ
            </Text>
            <Controller
              name="amount"
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <TextInput
                  inputMode="decimal"
                  placeholderTextColor={"#64748b"}
                  style={fonts.fontRegular}
                  className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                  placeholder="المبلغ"
                  value={value ? String(value) : ""}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </View>
        </View>
        <View>
          {errors.amount && (
            <Text
              style={fonts.fontRegular}
              className="text-red-600 text-center"
            >
              {errors.amount.message}
            </Text>
          )}
          {errors.type && (
            <Text
              style={fonts.fontRegular}
              className="text-red-600 text-center"
            >
              {errors.type.message}
            </Text>
          )}
        </View>
        <Button
          onPress={handleSubmit(() =>
            addEntry({
              type: {
                value: value!,
                label: baseTypes.find((type) => type.value === value)!.label,
              },
              amount: Number(amount),
            })
          )}
          className="mt-10"
          text="حفظ"
        />
      </View>
    </>
  );
};

const baseTypes: ReceiptEntryType[] = [
  {
    value: "sell",
    label: "بيع",
  },
  {
    value: "buy",
    label: "شراء",
  },
  {
    value: "transfer",
    label: "تحويل",
  },
  {
    value: "expense",
    label: "مصروف",
  },
];

export default AddEntryScreen;
