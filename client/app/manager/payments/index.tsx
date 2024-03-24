import { FlatList, View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import { Input, PaymentCard } from "@/lib/components";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/lib/styles";
import { OptionsModal } from "./_components/OptionsModal";
import { Payment } from "@/lib/models";
import { useInfiniteGet } from "@/lib/shared/query";
import { useDebouncedCallback } from "use-debounce";
import { usePaymentFilters } from "./logic/paymentFilters.zustand";
import { PaymentFilters } from "./logic/paymentFilters.schema";
import { formatDate } from "@/lib/shared/date";

export default function MainManagerPaymentsScreen() {
  const [query, setQuery] = useState("");

  const filters = usePaymentFilters((s) => s.filters);

  const [url, setUrl] = useState("payments");

  const handleSearch = useDebouncedCallback((term) => setQuery(term), 300);

  useEffect(() => {
    const tempUrl = constructUrl(query, filters);
    console.log("tempUrl ");
    console.log(
      "--------------------------------------------------------------"
    );
    console.log(`------------${tempUrl}------------`);
    console.log(
      "--------------------------------------------------------------"
    );
    setUrl(tempUrl);
  }, [query, filters]);

  // TODO:filter by location id
  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGet<Payment>(url, ["payments", url.slice(url.indexOf("?") + 1)]);

  return (
    <>
      <Stack.Screen
        options={{
          title: "تقارير اوامر التوريد",
          ...options,
        }}
      />
      <View className="flex-1 bg-white">
        <Input
          label="رقم الهاتف"
          classes="mt-4 mx-2"
          onChangeText={handleSearch}
          inputMode="tel"
        />
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
            else
              return (
                <FlatList
                  data={data?.pages.flatMap((page) => page.data.data) || []}
                  renderItem={({ item }) => (
                    <PaymentCard elevation={true} {...item} />
                  )}
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

const constructUrl = (query: string, searchOptions: PaymentFilters) => {
  const params = new URLSearchParams();
  Object.entries(searchOptions).forEach(([key, value]) => {
    if (key === "created_at" || key === "close_date") {
      if (searchOptions[key].status && searchOptions[key].value) {
        params.append(key, formatDate(searchOptions[key].value as Date));
      }

      if (key === "close_date") {
        params.append(`${key}_operator`, "<=");
      } else {
        params.append(`${key}_operator`, ">=");
      }
    } else {
      if (value) {
        params.append(key, String(value));
      }
    }
  });
  if (query) {
    params.append("phone", query);
  }
  const paramString = params.toString();
  if (paramString) {
    return `payments?${paramString}`;
  } else {
    return "payments";
  }
};
