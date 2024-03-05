import React from "react";
import { Text, TextInput, View, ScrollView } from "react-native";
import { fonts } from "@/lib/styles/fonts";
import { Button } from "@/lib/components";
import { options } from "@/lib/shared/ScreenOptions";
import { Stack } from "expo-router";

const CreateAccountScreen = () => {
  return (
    <>
      <Stack.Screen
        options={{
          title: "انشاء حساب",
          ...options,
        }}
      />
      <View className="flex-1 pt-8">
        <Text
          style={fonts.fontArabicBold}
          className="text-center text-3xl text-slate-800"
        >
          انشاء حساب
        </Text>
        <ScrollView
          style={{
            paddingBottom: 40,
          }}
          className="overflow-y-scroll flex-1 pb-40"
        >
          <View className="pt-6 px-4 space-y-5">
            <View>
              <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
                الاسم
              </Text>
              <TextInput
                placeholderTextColor={"#64748b"}
                style={fonts.fontArabicRegular}
                className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                placeholder="الاسم"
              />
            </View>
            <View>
              <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
                البريد الإلكتروني
              </Text>
              <TextInput
                placeholderTextColor={"#64748b"}
                style={fonts.fontArabicRegular}
                className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                placeholder="البريد الإلكتروني"
              />
            </View>
            <View>
              <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
                كلمة المرور
              </Text>
              <TextInput
                placeholderTextColor={"#64748b"}
                style={fonts.fontArabicRegular}
                className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                placeholder="كلمة المرور"
              />
            </View>
            <View>
              <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
                تأكيد كلمة المرور
              </Text>
              <TextInput
                placeholderTextColor={"#64748b"}
                style={fonts.fontArabicRegular}
                className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                placeholder="تأكيد كلمة المرور"
              />
            </View>
            <View>
              <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
                المأمورية
              </Text>
              <TextInput
                placeholderTextColor={"#64748b"}
                style={fonts.fontArabicRegular}
                className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                placeholder="المأمورية"
              />
            </View>
            <View>
              <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
                المسمى الوظيفي
              </Text>
              <TextInput
                placeholderTextColor={"#64748b"}
                style={fonts.fontArabicRegular}
                className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                placeholder="المسمى الوظيفي"
              />
            </View>
            <View>
              <Text style={fonts.fontArabicSemi} className="text-lg mr-3 mb-2">
                رقم الهاتف
              </Text>
              <TextInput
                placeholderTextColor={"#64748b"}
                style={fonts.fontArabicRegular}
                className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
                placeholder="رقم الهاتف"
              />
            </View>
          </View>
          <Button text="انشاء حساب" className="my-10" />
        </ScrollView>
      </View>
    </>
  );
};

export default CreateAccountScreen;
