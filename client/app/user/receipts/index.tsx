import { Button } from "@/lib/components";
import { options } from "@/lib/constants/ScreenOptions";
import Stack from "expo-router/stack";
import React, { useState } from "react";
import { View } from "react-native";
import { DatePickerModal } from "./_components/DatePickerModal";
import { OldDaysModal } from "./_components/OldDaysModal";
import { router } from "expo-router";
import { useOpenDay } from "./logic/openDay/openDay.hooks";

const ReceiptsScreen = () => {
  const [isOldModalOpen, setIsOldModalOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const { day } = useOpenDay();

  return (
    <>
      <Stack.Screen
        options={{
          title: "التحصيلات",
          ...options,
        }}
      />

      <View className="flex-1 justify-center bg-white">
        <View>
          {day.get() ? (
            <Button
              text="استكمال اليومية"
              onPress={() => router.push("/user/receipts/NewDay")}
            />
          ) : (
            <Button
              text="فتح يومية جديدة"
              onPress={() => setIsDatePickerOpen(true)}
            />
          )}

          <Button
            text="عرض يومية قديمة"
            onPress={() => setIsOldModalOpen(true)}
          />
        </View>
      </View>

      <DatePickerModal
        isOpen={isDatePickerOpen}
        setIsOpen={setIsDatePickerOpen}
      />
      <OldDaysModal isOpen={isOldModalOpen} setIsOpen={setIsOldModalOpen} />
    </>
  );
};

export default ReceiptsScreen;
