import { ActivityIndicator, FlatList, View, Text } from "react-native";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { options, locations } from "@/lib/constants";
import { DropDown, Reciept } from "@/lib/components";
import { useCustomQuery } from "@/lib/shared/query";
import { Receipt } from "@/lib/models";
import { fonts } from "@/lib/styles/fonts";

const locationsData = locations.map((location) => {
  return { label: location.name, value: location.id };
});

const ReportsScreen = () => {
  const [location, setLocation] = useState(0);

  const { data, isPending, error } = useCustomQuery<Receipt[]>(
    `/receipts?location_id=${location}`,
    "get",
    { enabled: location !== 0 }
  );
  if (data) {
    console.log("report data =>", data);
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "التقارير",
          ...options,
        }}
      />
      <View className="flex-1 pt-4 px-2">
        <DropDown
          label="المأمورية"
          items={locationsData}
          onChange={setLocation}
        />

        {(() => {
          if (!data && !error) {
            return (
              <View className="justify-center flex-1">
                <Text
                  className="text-xl text-center"
                  style={fonts.fontArabicBold}
                >
                  اختر مأمورية لعرض البيانات
                </Text>
              </View>
            );
          } else if (data) {
            if (data.data.data.length) {
              return (
                <>
                  <FlatList
                    className="mt-4 "
                    ListFooterComponent={<View className="h-16" />}
                    data={data.data.data}
                    renderItem={({ item }) => <Reciept receipt={item} />}
                    ItemSeparatorComponent={() => <View className="h-2" />}
                    keyExtractor={(item) => item.id.toString()}
                  />
                  <View className="h-px bg-sky-950 my-4" />
                  <View className="px-2 flex flex-row items-center justify-between mb-6">
                    <Text className="text-lg" style={fonts.fontArabicRegular}>
                      {data.data.data
                        .reduce((acc, item) => acc + item.total, 0)
                        .toFixed(2) || 0}{" "}
                      جنيه
                    </Text>
                    <Text className="text-lg" style={fonts.fontArabicRegular}>
                      الاجمالي
                    </Text>
                  </View>
                </>
              );
            } else {
              return (
                <View className="justify-center flex-1">
                  <Text
                    className="text-xl text-center"
                    style={fonts.fontArabicBold}
                  >
                    لا يوجد بيانات
                  </Text>
                </View>
              );
            }
          } else if (isPending) {
            return (
              <View className="justify-center flex-1">
                <Text className="text-center w-full">
                  <ActivityIndicator size={"large"} color={"#0284c7"} />
                </Text>
              </View>
            );
          }
        })()}
      </View>
    </>
  );
};

export default ReportsScreen;
