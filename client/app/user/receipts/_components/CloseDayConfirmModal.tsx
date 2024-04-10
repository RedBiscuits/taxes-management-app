import { View, Text, Modal } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { fonts } from "@/lib/styles";
import { Button } from "@/lib/components";
import Icon from "react-native-vector-icons/AntDesign";
import { useToast } from "@/lib/components/toastModal/toastModal.zustand";
import { usePost } from "@/lib/shared/query";
import { router } from "expo-router";
import { useOpenDay } from "../logic/openDay/openDay.hooks";
import { useCurrentReceipt } from "../logic/receipts/receipt.hooks";

export function CloseDayCofirmModal({
  isOpen,
  setIsOpen,
  day_id,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  day_id: number;
}) {
  const { toast } = useToast();

  const { day } = useOpenDay();
  const { currentReceipt } = useCurrentReceipt();

  const { mutate, isPending } = usePost(`days/${day_id}/close`, [["days"]], {
    onSuccess: () => {
      toast.success("تم اغلاق اليومية لنجاح");
      router.replace("/user/receipts/");
      day.set(null);
      currentReceipt.set(null);
    },
    onError: (error) => {
      console.log(error);
      toast.error("حدث خطأ ما");
    },
    onSettled: () => {
      setIsOpen(false);
    },
  });

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
              <View className="mt-6">
                <Text
                  style={fonts.fontArabicBold}
                  className="text-2xl text-center mb-4"
                >
                  هل انت متأكد من اغلاق اليوم؟
                </Text>
                <Text
                  style={fonts.fontArabicBold}
                  className="text-2xl text-center"
                >
                  لا يمكنك التراجع عن هذه العملية
                </Text>
              </View>
              <View className="flex- flex-row items-center">
                <Button
                  onPress={() => setIsOpen(false)}
                  text="تراجع"
                  className=" w-1/2 mx-auto bg-"
                />
                <View className="w-4" />
                <Button
                  loading={isPending}
                  onPress={() => mutate(undefined)}
                  text="تأكيد"
                  className=" w-1/2 mx-auto bg-red-600"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
