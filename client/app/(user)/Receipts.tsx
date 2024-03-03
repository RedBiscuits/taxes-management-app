import Fab from "@/lib/components/Fab";
import Reciept from "@/lib/components/Reciept";
import { Receipt } from "@/lib/models/receipt";
import { options } from "@/lib/shared/ScreenOptions";
import { useCustomMutation, useCustomQuery } from "@/lib/shared/query";
import { fonts } from "@/lib/styles/fonts";
import { router } from "expo-router";
import Stack from "expo-router/stack";
import React from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";

const ReceiptsScreen = () => {
  const { data, isPending, error } = useCustomQuery<any>("/receipts");

  const createReceipt = useCustomMutation("/receipts", "post", {
    onSuccess: () => {
      router.push("/(user)/Add Reciept");
    },
  });

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
        } else if (data.data?.data?.length !== 0) {
          return (
            <View className="flex-1">
              <FlatList
                className="px-2 pt-4"
                ListFooterComponent={<View className="h-16" />}
                data={receipts}
                renderItem={({ item }) => <Reciept receipt={item} />}
                ItemSeparatorComponent={() => <View className="h-2" />}
                keyExtractor={(item, index) => index.toString()}
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
          onPress={() =>
            createReceipt.mutate({
              day_id: 1,
              location_id: 1,
            })
          }
        />
      )}
    </>
  );
};

const receipts: Receipt[] = [
  {
    createdAt: new Date(),
    entries: [
      {
        type: {
          value: "sell",
          label: "بيع",
        },
        amount: 200,
      },
      {
        type: {
          value: "buy",
          label: "شراء",
        },
        amount: 150,
      },
    ],
  },
  {
    createdAt: new Date(),
    entries: [
      {
        type: {
          value: "sell",
          label: "بيع",
        },
        amount: 200,
      },
      {
        type: {
          value: "buy",
          label: "شراء",
        },
        amount: 150,
      },
    ],
  },
  {
    createdAt: new Date(),
    entries: [
      {
        type: {
          value: "sell",
          label: "بيع",
        },
        amount: 200,
      },
      {
        type: {
          value: "buy",
          label: "شراء",
        },
        amount: 150,
      },
    ],
  },
];

export default ReceiptsScreen;
