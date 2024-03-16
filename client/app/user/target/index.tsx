import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { options } from "@/lib/constants";
import { fonts } from "@/lib/styles";
import { Alphanumeric } from "@/lib/components";

export default function MainTargetPage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "المستهدف",
          ...options,
        }}
      />
      <ScrollView>
        {/* target section */}
        <View className="mt-6 mx-2 bg-white">
          <Text
            style={fonts.fontArabicBold}
            className="text-center text-xl py-3 bg-slate-300 rounded-t-md"
          >
            السنوي
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
        {/* end of target section */}

        {/* target section */}
        <View className="mx-2">
          <Text
            style={fonts.fontArabicBold}
            className="text-center text-xl py-3 bg-slate-300"
          >
            شهر مارس
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
        {/* end of target section */}
        {/* target section */}
        <View className="mx-2">
          <Text
            style={fonts.fontArabicBold}
            className="text-center text-xl py-3 bg-slate-300"
          >
            شهر مارس
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
        {/* end of target section */}
        {/* target section */}
        <View className="mx-2">
          <Text
            style={fonts.fontArabicBold}
            className="text-center text-xl py-3 bg-slate-300"
          >
            شهر مارس
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
                  <View className="w-full flex py-2 flex-row justify-evenly ">
                    <Alphanumeric classes="text-lg">1200000</Alphanumeric>
                    <Alphanumeric classes="text-lg">100%</Alphanumeric>
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
        {/* end of target section */}
        <View className="my-6" />
      </ScrollView>
    </>
  );
}
