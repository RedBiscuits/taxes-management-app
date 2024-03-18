import { View, Text, Modal, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { fonts } from "@/lib/styles";
import { DatePicker, Button } from "@/lib/components";
import CheckBox from "@/lib/components/Form/CheckBox";
import Icon from "react-native-vector-icons/AntDesign";
import { Options } from "../types/options";

export function OptionsModal({
  options,
  setOptions,
}: {
  options: Options;
  setOptions: Dispatch<SetStateAction<Options>>;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const toggleModal = () => setIsOpen((x) => !x);

  const [localOptions, setLocalOptions] = useState<Options>(options);

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
              <DatePicker
                date={date}
                setDate={setDate}
                label="تاريخ البداية"
                classes="mb-4"
              />
              <DatePicker date={date} setDate={setDate} label="تاريخ النهاية" />
              <View className="my-6">
                <CheckBox
                  onChange={(status) =>
                    setLocalOptions((prv) => ({
                      ...prv,
                      status,
                    }))
                  }
                  value={localOptions.status}
                >
                  مدفوع
                </CheckBox>
              </View>
              <Button
                onPress={() => {
                  setOptions(localOptions);
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
