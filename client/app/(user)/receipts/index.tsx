import { Fab, Reciept } from "@/lib/components";
import { Receipt, Base_Model, Base_Response } from "@/lib/models";
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

type ReceiptData = {
  day_id: number;
  location_id: number;
};

type ReceiptResponse = Base_Model & ReceiptData;

const ReceiptsScreen = () => {
  const [locationId, setlocationId] = useState(0);
  const { data, isPending } = useCustomQuery<Receipt[]>(
    `/receipts?location_id=${locationId}`,
    "get",
    {
      enabled: locationId !== 0,
    }
  );
  const day_id = useDayStore((store) => store.day_id);
  const createLocalReceipt = useReceiptStore((store) => store.createReceipt);

  useEffect(() => {
    (async () => {
      const user = await getUser();
      setlocationId(user?.name.endsWith("1") ? 1 : 2);
    })();
  }, []);

  const createReceipt = useCustomMutation<ReceiptData, ReceiptResponse>(
    "/receipts",
    "post",
    {
      onSuccess: (data) => {
        createLocalReceipt(data.data.data.id);
        router.push("/(user)/receipts/Add Reciept");
      },
    }
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "الضرائب",
          ...options,
        }}
      />
      {(() => {
        if (isPending || createReceipt.isPending) {
          return (
            <View className="flex-1 justify-center">
              <ActivityIndicator color={"#0284c7"} size={"large"} />
            </View>
          );
        } else if (data?.data.data.length !== 0) {
          return (
            <View className="flex-1">
              <FlatList
                className="px-2 pt-4"
                ListFooterComponent={<View className="h-16" />}
                data={data?.data.data || []}
                renderItem={({ item }) => <Reciept receipt={item} />}
                ItemSeparatorComponent={() => <View className="h-2" />}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          );
        } else {
          return (
            <View className="flex-1 justify-center items-center">
              <Text className="text-xl" style={fonts.fontArabicRegular}>
                لا يوجد بيانات
              </Text>
            </View>
          );
        }
      })()}
      {!isPending && (
        <Fab
          onPress={async () => {
            const user = await getUser();
            const location_id = user?.name.endsWith("1") ? 1 : 2;
            createReceipt.mutate({
              day_id,
              location_id,
            });
          }}
        />
      )}
    </>
  );
};

export default ReceiptsScreen;
