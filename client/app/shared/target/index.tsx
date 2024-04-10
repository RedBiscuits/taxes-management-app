import { ActivityIndicator, ScrollView, View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { options } from "@/lib/constants";
import TargetView from "./_components/TargetView";
import { useGet } from "@/lib/shared/query";
import { Receipt, Target } from "@/lib/models";
import { useUser } from "@/lib/shared/storage";
import { colors, fonts } from "@/lib/styles";

export default function MainTargetPage() {
  const user = useUser();

  console.log(" ===> user location", user?.location_id);

  const receipts = useGet<Receipt[]>(
    `receipts/all?location_id=${user?.location_id}`,
    ["receipts", "all"]
  );
  const target = useGet<Target>(`targets?location_id=${user?.location_id}`, [
    "target",
    String(user?.location_id),
  ]);

  const isLoading = receipts.isPending || target.isPending;
  const data = !!receipts.data && !!target.data;

  return (
    <>
      <Stack.Screen
        options={{
          title: "المستهدف",
          ...options,
        }}
      />
      {(() => {
        if (isLoading)
          return (
            <ActivityIndicator
              color={colors.primary_blue}
              size="large"
              className="mt-40"
            />
          );
        else if (data)
          return (
            <ScrollView>
              <TargetView
                title="سنوي"
                receipts={receipts.data}
                target={target.data}
              />
              <TargetView
                title="ربع سنوي"
                receipts={receipts.data}
                target={target.data}
              />
              <TargetView
                title="شهري"
                receipts={receipts.data}
                target={target.data}
              />
              <TargetView
                title="توريدة"
                receipts={receipts.data}
                target={target.data}
              />
              <View className="h-10" />
            </ScrollView>
          );
        else
          return (
            <View className="flex-1">
              <Text
                style={fonts.fontArabicBold}
                className="text-center text-xl mt-20"
              >
                لا توجد بيانات
              </Text>
            </View>
          );
      })()}
    </>
  );
}
