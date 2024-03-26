import { View, Text, Modal } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { fonts } from "@/lib/styles";
import { DatePicker, Button } from "@/lib/components";
import { router } from "expo-router";
import Icon from "react-native-vector-icons/AntDesign";
import { usePost } from "@/lib/shared/query";
import { BaseModel, Day } from "@/lib/models";
import { useToast } from "@/lib/components/toastModal/toastModal.zustand";
import dayjs from "dayjs";
import { useOpenDay } from "../logic/openDay/openDay.hooks";
import { getUser } from "@/lib/shared/storage";

export function DatePickerModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { toast } = useToast();
  const [date, setDate] = useState(new Date());
  const { day } = useOpenDay();

  const { mutate, isPending } = usePost<Omit<Day, keyof BaseModel>, Day>(
    "days",
    [["current_day"]],
    {
      onSuccess: async (data) => {
        setIsOpen(false);
        router.push("/user/receipts/NewDay");
        console.log(data.data);
        toast.success("تمت فتح يومية جديدة بنجاح");
        day.set(data.data);
      },
      onError: (error) => {
        console.log(error);
        toast.error("حدث خطأ ما");
      },
    }
  );

  return (
    <>
      <Modal visible={isOpen} transparent animationType="fade">
        <View className="flex-1 bg-black/50">
          <View className="  flex w-full justify-center absolute top-1/3">
            <View className="mx-4 bg-white p-6  rounded-lg">
              <View className="flex flex-row w-full justify-end">
                <Text onPress={() => setIsOpen(false)}>
                  <Icon name="close" size={22} />
                </Text>
              </View>
              <Text
                style={fonts.fontArabicBold}
                className="text-xl text-center mb-6"
              >
                تحديد التاريخ
              </Text>
              <View className="my-2" />
              <DatePicker
                date={date}
                setDate={setDate}
                label="التاريخ"
                classes="mb-4"
              />
              <Button
                loading={isPending}
                onPress={async () =>
                  mutate({
                    time: dayjs(date).format("YYYY/MM/DD HH:mm:ss"),
                    start_date: dayjs(date).format("YYYY/MM/DD HH:mm:ss"),
                    end_date: dayjs(date).format("YYYY/MM/DD HH:mm:ss"),
                    name: "day",
                    status: true,
                    location_id: (await getUser())!.location.id,
                  })
                }
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
