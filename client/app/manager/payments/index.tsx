import { FlatList, View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import { Input, PaymentCard } from "@/lib/components";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/lib/styles";
import { OptionsModal } from "./_components/OptionsModal";
import { PaginatedResponse, Payment } from "@/lib/models";
import { useGet } from "@/lib/shared/query";
import { Options } from "./types/options";
import { useDebouncedCallback } from "use-debounce";

export default function MainManagerPaymentsScreen() {
  const [query, setQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState<Options>({
    status: false,
  });
  const [url, setUrl] = useState("payments");

  const handleSearch = useDebouncedCallback((term) => setQuery(term), 300);

  useEffect(() => {
    const tempUrl = constructUrl(query, searchOptions);
    // console.log("tempUrl =>", tempUrl);
    const params = tempUrl.slice(url.indexOf("?") + 1);
    // console.log("params => ", params);

    setUrl(tempUrl);
  }, [query, searchOptions.status]);

  const { data, isPending } = useGet<PaginatedResponse<Payment>>(url, [
    "payments",
    url.slice(url.indexOf("?") + 1),
  ]);

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
        <OptionsModal options={searchOptions} setOptions={setSearchOptions} />
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
                  data={data?.data}
                  renderItem={({ item }) => (
                    <PaymentCard elevation={true} {...item} />
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  ListFooterComponent={() => <View className="h-10" />}
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

const constructUrl = (query: string, searchOptions: Options) => {
  const params = new URLSearchParams();
  Object.entries(searchOptions).forEach(([key, value]) => {
    if (value) {
      params.append(key, String(value));
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
