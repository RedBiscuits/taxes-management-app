import { View } from "react-native";
import React, { useState } from "react";
import { options } from "@/lib/constants";
import { router, Stack } from "expo-router";
import { Alphanumeric, Button } from "@/lib/components";
import dayjs from "dayjs";
import { useOpenDay } from "./logic/openDay/openDay.hooks";
import { CloseDayCofirmModal } from "./_components/CloseDayConfirmModal";
import { usePost } from "@/lib/shared/query";
import { useToast } from "@/lib/components/toastModal/toastModal.zustand";
import { useCurrentReceipt } from "./logic/receipts/receipt.hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Receipt } from "@/lib/models";

type NewReceipt = { day_id: number; location_id: number };

export default function NewDayScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: openDay } = useOpenDay();
  const { currentReceipt } = useCurrentReceipt();

  const { toast } = useToast();

  const { mutate, isPending } = usePost<NewReceipt, Receipt>(
    "receipts",
    [["receipts"]],
    {
      onSuccess: async (data) => {
        await currentReceipt.set(data.data);
        if (currentReceipt.get()) {
          router.push("/user/receipts/NewReciept");
        }
      },
      onError: (error) => {
        toast.error("حدث خطأ ما");
        console.log(error);
      },
    }
  );
  console.log(currentReceipt.get());

  if (!openDay) return router.push("/user/receipts/");
  return (
    <>
      <Stack.Screen
        options={{
          title: "يومية جديدة",
          ...options,
        }}
      />

      <View className="flex-1">
        <View className="mt-10">
          <Alphanumeric classes="text-center text-4xl w-full">
            {dayjs(openDay.time).format("YYYY-MM-DD")}
          </Alphanumeric>
        </View>

        <View className="flex-1 justify-center">
          <View>
            {/* TODO:if there is a receipt continue that receipt */}
            {currentReceipt.get() ? (
              <Button
                text="استكمال التحصيل"
                onPress={() => router.push("/user/receipts/NewReciept")}
              />
            ) : (
              <Button
                loading={isPending}
                text="اضافة تحصيل جديد"
                // TODO:get location id
                onPress={() => mutate({ day_id: openDay.id, location_id: 1 })}
              />
            )}

            <Button
              text="عرض تحصيلات اليومية"
              onPress={() => router.push("/user/receipts/NewReceipts")}
            />
            <Button
              text="اغلاق اليومية"
              onPress={async () => {
                setIsOpen(true);
                await currentReceipt.set(null);
              }}
            />
          </View>
        </View>
      </View>
      <CloseDayCofirmModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        day_id={openDay.id}
      />
    </>
  );
}
