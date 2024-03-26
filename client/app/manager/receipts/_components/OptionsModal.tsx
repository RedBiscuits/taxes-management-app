import { View, Text, Modal, Pressable } from "react-native";
import React, { useState } from "react";
import { fonts } from "@/lib/styles";
import {
  Button,
  ControlledCheckBox,
  ControlledDropDown,
} from "@/lib/components";
import Icon from "react-native-vector-icons/AntDesign";
import { useFilteredReceipts } from "../logic/receiptFilters.hooks";
import { paymentTypesData, taxTypesData } from "@/lib/constants";
import { useUser } from "@/lib/shared/storage";
import { useGet } from "@/lib/shared/query";
import { Day, PaginatedResponse } from "@/lib/models";

export function OptionsModal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleModal = () => setIsOpen((x) => !x);

  const { control, setFilters, watch } = useFilteredReceipts();

  const user = useUser();

  console.log("user", user?.location.id);

  const baseUrl = "days?location_id=" + user?.location.id;

  const { data, status, error } = useGet<PaginatedResponse<Day>>(baseUrl, [
    baseUrl,
    "manager",
  ]);

  console.log("status", status);
  console.log("error", error);

  let daysData: { label: string; value: number }[] = [];
  if (data) {
    console.log(data.data);
    daysData =
      data.data?.map((day) => ({
        label: day.time,
        value: day.id,
      })) || [];
  }

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
                  name="day_id.status"
                  classes="mt-8"
                />
                <ControlledDropDown
                  control={control}
                  disabled={!watch("day_id.status")}
                  placeholder="اليوم"
                  label="اليوم"
                  zindex={300}
                  zindexinverse={100}
                  items={daysData}
                  width={270}
                  name="day_id.value"
                />
              </View>
              <View className="flex flex-row justify-end items-center">
                <ControlledCheckBox
                  control={control}
                  name="tax_type.status"
                  classes="mt-8"
                />
                <ControlledDropDown
                  control={control}
                  disabled={!watch("tax_type.status")}
                  label="نوع الضريبة"
                  zindex={200}
                  zindexinverse={200}
                  items={taxTypesData}
                  width={270}
                  name="tax_type.value"
                />
              </View>
              <View className="flex flex-row justify-end items-center">
                <ControlledCheckBox
                  control={control}
                  name="payment_type.status"
                  classes="mt-8"
                />
                <ControlledDropDown
                  control={control}
                  disabled={!watch("payment_type.status")}
                  label="طريقة الدفع"
                  zindex={100}
                  zindexinverse={300}
                  items={paymentTypesData}
                  width={270}
                  name="payment_type.value"
                />
              </View>

              <Button
                onPress={() => {
                  // console.log("filters on press", watch());
                  setFilters();
                  // toggleModal();
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
