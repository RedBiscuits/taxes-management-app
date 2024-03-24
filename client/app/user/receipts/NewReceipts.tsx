import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import dayjs from "dayjs";
import { Alphanumeric, Reciept } from "@/lib/components";
import { Receipt } from "@/lib/models";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/lib/styles";
import { useInfiniteGet } from "@/lib/shared/query";
import { useOpenDay } from "./logic/openDay/openDay.hooks";

export default function NewReceipts() {
  const { day } = useOpenDay();
  const openDay = day.get();
  // TODO: filter by location
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGet<Receipt>(`receipts?day_id=${openDay?.id}`, [
      "receipts",
      String(openDay?.id),
    ]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "اليومية الجديدة",
          ...options,
        }}
      />
      <View className="flex-1 bg-white pt-3">
        <Alphanumeric classes="text-center text-xl w-full">
          {dayjs(openDay?.time).format("YYYY-MM-DD")}
        </Alphanumeric>

        <View className="flex-1 bg-slate-200 mt-3">
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
                  ItemSeparatorComponent={() => <View className="h-2" />}
                  keyExtractor={(item) => item.id.toString()}
                  onEndReached={() => hasNextPage && fetchNextPage()}
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
