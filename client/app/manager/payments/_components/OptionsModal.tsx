import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { fonts } from "@/lib/styles";
import { Button, ControlledDatePicker } from "@/lib/components";
import Icon from "react-native-vector-icons/AntDesign";
import { useFilteredPayments } from "../logic/paymentFilters.hooks";
import { ControlledCheckBox } from "@/lib/components/Form/ControlledCheckBox";
import { ControlledCheckBoxWithText } from "@/lib/components/Form/ControlledCheckBoxWithText";

export function OptionsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((x) => !x);

  const { control, setFilters, watch } = useFilteredPayments();

  return (
    <>
      <View>
        <Pressable
          onPress={toggleModal}
          android_ripple={{
            color: "#fff",
          }}
          className="flex flex-row items-center justify-end px-2 mt-4"
        >
          <Text style={fonts.fontArabicBold} className="text-lg">
            خيارات البحث
          </Text>
          <Text>
            <Icon name="filter" size={28} />
          </Text>
        </Pressable>
      </View>

      <Modal visible={isOpen} transparent animationType="fade">
        <View className="flex-1 bg-black/50">
          <View className="  flex w-full justify-center absolute top-32">
            <View className="mx-4 bg-white p-6  rounded-lg">
              <Text
                style={fonts.fontArabicBold}
                className="text-xl text-center mb-6"
              >
                خيارات البحث
              </Text>
              <View className="my-2" />
              <View className="flex flex-row justify-end items-center">
                <ControlledCheckBox
                  control={control}
                  name="created_at.status"
                  classes="mt-8"
                />
                <ControlledDatePicker
                  control={control}
                  disabled={!watch("created_at.status")}
                  label="تاريخ البداية"
                  classes="mb-4 w-64 ml-4"
                  name="created_at.value"
                />
              </View>
              <View className="flex flex-row justify-end items-center">
                <ControlledCheckBox
                  control={control}
                  name="created_at_2.status"
                  classes="mt-8"
                />
                <ControlledDatePicker
                  control={control}
                  disabled={!watch("created_at_2.status")}
                  label="تاريخ النهاية"
                  classes="mb-4 w-64 ml-4"
                  name="created_at_2.value"
                />
              </View>
              <View className="my-6">
                <ControlledCheckBoxWithText
                  control={control}
                  name="payed"
                  classes="px-2 mt-4"
                >
                  مدفوع
                </ControlledCheckBoxWithText>
              </View>
              <Button
                onPress={() => {
                  setFilters();
                  toggleModal();
                }}
                text="تأكيد"
                className="mt-8 w-full mx-auto"
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
