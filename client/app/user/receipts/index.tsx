import { Button, Fab, Reciept } from "@/lib/components";
import { Receipt, BaseModel, BaseResponse } from "@/lib/models";
import { options } from "@/lib/constants/ScreenOptions";
import { useCustomMutation, useCustomQuery } from "@/lib/shared/query";
import { fonts } from "@/lib/styles/fonts";
import { router } from "expo-router";
import Stack from "expo-router/stack";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDayStore } from "../day/logic/day.zustand";
import { useReceiptStore } from "./logic/receipt.zustand";
import { getUser } from "@/lib/shared/storage";
import { DatePickerModal } from "./_components/DatePickerModal";

type ReceiptData = {
  day_id: number;
  location_id: number;
};

type ReceiptResponse = BaseModel & ReceiptData;

const ReceiptsScreen = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [type, setType] = useState("");
  const openModal = (type: string) => {
    setIsOpen(true);
    setType(type);
  };
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
          <Button text="فتح يومية جديدة" onPress={() => openModal("new")} />
          <Button text="عرض يومية قديمة" onPress={() => openModal("old")} />
        </View>
      </View>

      <DatePickerModal
        type={type}
        open={isOpen}
        toggleModal={setIsOpen}
        date={date}
        setDate={setDate}
      />
    </>
  );
};

export default ReceiptsScreen;
