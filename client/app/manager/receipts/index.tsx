import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import dayjs from "dayjs";
import { Alphanumeric, Reciept } from "@/lib/components";
import { Receipt } from "@/lib/models";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/lib/styles";
import { OptionsModal } from "./_components/OptionsModal";
import { getUser } from "@/lib/shared/storage";
import { useInfiniteGet } from "@/lib/shared/query";
import { ReceiptFilters } from "./logic/receiptsFilters.schema";
import { useReceiptsFilters } from "./logic/receiptsFilters.zustand";

export default function ManagerReciptsScreen() {
  const filters = useReceiptsFilters((s) => s.filters);
  const url = useUrl(filters);

  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGet<Receipt>(url, [url]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "التحصيلات",
          ...options,
        }}
      />
      <View className="flex-1 bg-white pt-3">
        <Alphanumeric classes="text-center text-xl w-full">
          {dayjs().format("YYYY-MM-DD")}
        </Alphanumeric>
        <OptionsModal />

        <View className="flex-1 bg-slate-200 mt-6">
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

const constructUrl = async (searchOptions: ReceiptFilters) => {
  const params = new URLSearchParams();

  Object.entries(searchOptions).forEach(([key, value]) => {
    if (value.status) {
      params.append(key, String(value.value));
    }
  });

  const user = await getUser();
  if (user) params.append("location_id", user.location.id.toString());

  const paramString = params.toString();
  if (paramString) {
    return `receipts?${paramString}`;
  } else {
    return "receipts";
  }
};

function useUrl(filters: ReceiptFilters) {
  const [url, setUrl] = useState("receipts");

  useEffect(() => {
    (async () => {
      const tempUrl = await constructUrl(filters);
      console.log(
        "--------------------------------------------------------------"
      );
      console.log(`------------  ${tempUrl}  ------------`);
      console.log(
        "--------------------------------------------------------------"
      );
      setUrl(tempUrl);
    })();
  }, [JSON.stringify(filters)]);

  return url;
}
