import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { options } from "@/lib/constants";
import { useOldDayStore } from "./logic/OldDay/oldDay.zustand";
import { Alphanumeric, Reciept } from "@/lib/components";
import { colors, fonts } from "@/lib/styles";
import { PaginatedResponse, Receipt } from "@/lib/models";
import { LinearGradient } from "expo-linear-gradient";
import { useGet, useInfiniteGet } from "@/lib/shared/query";

export default function OldDayReceipts() {
  const day = useOldDayStore((s) => s.day);

  // TODO: filter by location id
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGet<Receipt>(`receipts?day_id=${day?.id}`, [
      "receipts",
      String(day?.id),
    ]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "اليومية القديمة",
          ...options,
        }}
      />

      <View className="flex-1">
        <Alphanumeric classes="w-full text-center pt-2 text-lg">
          {day?.time || ""}
        </Alphanumeric>
        <View className="flex-1 bg-slate-200 mt-2">
          <LinearGradient
            className="h-2"
            colors={["rgba(0,0,0,0.3)", "transparent"]}
          />
          {(() => {
            if (isPending)
              return (
                <View>
                  <ActivityIndicator
                    size={"large"}
                    className="mt-20"
                    color={colors.primary_blue}
                  />
                </View>
              );
            else if (data)
              return (
                <FlatList
                  className="px-2 pt-4"
                  data={data?.pages.flatMap((page) => page.data.data) || []}
                  renderItem={({ item }) => <Reciept receipt={item} />}
                  onEndReached={() => hasNextPage && fetchNextPage()}
                  ItemSeparatorComponent={() => <View className="h-2" />}
                  keyExtractor={(item) => item.id.toString()}
                  ListFooterComponent={() => (
                    <View className="h-10">
                      {isFetchingNextPage && (
                        <ActivityIndicator
                          size={"large"}
                          color={colors.primary_blue}
                        />
                      )}
                    </View>
                  )}
                  ListEmptyComponent={() => (
                    <View className="flex-1">
                      <Text
                        style={fonts.fontArabicBold}
                        className="text-center text-xl mt-20"
                      >
                        لا توجد بيانات
                      </Text>
                    </View>
                  )}
                />
              );
          })()}
        </View>
      </View>
    </>
  );
}
