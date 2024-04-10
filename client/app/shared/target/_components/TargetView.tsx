import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { Alphanumeric } from "@/lib/components";
import { fonts } from "@/lib/styles";
import { Receipt, Target } from "@/lib/models";
import {
  getCurrentMonthTarget,
  getCurrentQuarterTarget,
  getCurrentThirdTarget,
  getCurrentYearTarget,
} from "./TargetFunctions";

export default function TargetView({
  title,
  receipts,
  target,
}: {
  title: "سنوي" | "ربع سنوي" | "توريدة" | "شهري";
  receipts: Receipt[];
  target: Target;
}) {
  const targetData = useMemo(() => {
    switch (title) {
      case "سنوي":
        return getCurrentYearTarget(target, receipts);
      case "ربع سنوي":
        return getCurrentQuarterTarget(target, receipts);
      case "شهري":
        return getCurrentMonthTarget(target, receipts);
      case "توريدة":
        return getCurrentThirdTarget(target, receipts);
    }
  }, [title, receipts, target]);

  return (
    <View className={`${title === "سنوي" ? "mt-6" : ""} mx-2 bg-white`}>
      <Text
        style={fonts.fontArabicBold}
        className={`text-center text-xl py-3 bg-slate-300 ${
          title === "سنوي" ? "rounded-t-md" : ""
        }`}
      >
        {targetData.name}
      </Text>
      <View className="flex flex-row">
        <View className="border border-slate-300 w-full divide-slate-300 divide-y">
          {/* enclosing view */}
          <View className=" flex flex-row">
            {/* numbers */}
            <View className="divide-slate-300 divide-y w-5/6 border-r border-slate-300">
              <View className="w-full flex py-2 flex-row justify-evenly ">
                <Alphanumeric classes="text-lg">المبلغ</Alphanumeric>
                <Alphanumeric classes="text-lg">النسبة</Alphanumeric>
              </View>
              <View className="w-full flex py-2 flex-row justify-evenly">
                <Alphanumeric classes="text-lg">
                  جنيه
                  {targetData.target_amount.toFixed(2)}
                </Alphanumeric>
                <Alphanumeric classes="text-lg">
                  {targetData.target_percentage.toFixed(2)}%
                </Alphanumeric>
              </View>
            </View>
            {/* end of numbers */}

            {/* المستهدف او المحقق */}
            <View className="flex-1 flex items-center justify-center ">
              <Text
                style={[fonts.fontArabicSemi, { writingDirection: "rtl" }]}
                className="text-lg -rotate-90 w-20 text-center"
              >
                المستهدف
              </Text>
            </View>
            {/* المستهدف او المحقق */}
          </View>
          {/* end of enclosing view */}

          {/* enclosing view */}
          <View className=" flex flex-row">
            {/* numbers */}
            <View className="divide-slate-300 divide-y w-5/6 border-r border-slate-300">
              <View className="w-full flex py-2 flex-row justify-evenly ">
                <Alphanumeric classes="text-lg">المبلغ</Alphanumeric>
                <Alphanumeric classes="text-lg">النسبة</Alphanumeric>
              </View>
              <View className="w-full flex py-2 flex-row justify-evenly">
                <Alphanumeric classes="text-lg">
                  جنيه
                  {targetData.actual_amount.toFixed(2)}
                </Alphanumeric>
                <Alphanumeric classes="text-lg">
                  {targetData.actual_percentage.toFixed(2)}%
                </Alphanumeric>
              </View>
            </View>
            {/* end of numbers */}

            {/* المستهدف او المحقق */}
            <View className="flex-1 flex items-center justify-center ">
              <Text
                style={[fonts.fontArabicSemi, { writingDirection: "rtl" }]}
                className="text-lg -rotate-90 w-20 text-center"
              >
                المحقق
              </Text>
            </View>
            {/* المستهدف او المحقق */}
          </View>
          {/* end of enclosing view */}
        </View>
      </View>
    </View>
  );
}
