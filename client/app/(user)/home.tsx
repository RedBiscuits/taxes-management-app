import Fab from "@/lib/components/Fab";
import Reciept from "@/lib/components/Reciept";
import { Receipt } from "@/lib/models/receipt";
import { options } from "@/lib/shared/ScreenOptions";
import { router } from "expo-router";
import Stack from "expo-router/stack";
import React from "react";
import { View, FlatList } from "react-native";

const HomeScreen = () => {
  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: "الفواتير",
          ...options,
        }}
      />
      <FlatList
        className="px-2 pt-4"
        ListFooterComponent={<View className="h-16" />}
        data={[...receipts, ...receipts, ...receipts, ...receipts, ...receipts]}
        renderItem={({ item }) => <Reciept receipt={item} />}
        ItemSeparatorComponent={() => <View className="h-2" />}
        keyExtractor={(item, index) => index.toString()}
      />
      <Fab onPress={() => router.push("/(user)/Add Reciept")} />
    </View>
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

export default HomeScreen;
