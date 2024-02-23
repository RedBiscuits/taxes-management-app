import React from "react";
import { Text, TextInput, View, Pressable, ScrollView } from "react-native";
import {
  useFonts,
  ElMessiri_400Regular,
  ElMessiri_500Medium,
  ElMessiri_600SemiBold,
  ElMessiri_700Bold,
} from "@expo-google-fonts/dev";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "@/lib/styles/fonts";

const CreateAccountScreen = () => {
  let [fontsLoaded] = useFonts({
    ElMessiri_400Regular,
    ElMessiri_500Medium,
    ElMessiri_600SemiBold,
    ElMessiri_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView className="flex-1">
      <Text
        style={fonts.fontBold}
        className="text-center text-3xl text-slate-800"
      >
        انشاء حساب
      </Text>
      <ScrollView className="overflow-y-scroll">
        <View className="pt-6 px-4 space-y-5">
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontRegular}
            className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
            placeholder="الاسم"
          />
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontRegular}
            className="bg-slate-200 text-sky-900  rounded-2xl p-5 placeholder:text-xl"
            placeholder="البريد الإلكتروني"
          />
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontRegular}
            className="bg-slate-200 text-sky-900 rounded-2xl p-5 placeholder:text-xl"
            placeholder="كلمة المرور"
          />
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontRegular}
            className="bg-slate-200 text-sky-900 rounded-2xl p-5 placeholder:text-xl"
            placeholder="تأكيد كلمة المرور"
          />
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontRegular}
            className="bg-slate-200 text-sky-900 rounded-2xl p-5 placeholder:text-xl"
            placeholder="المأمورية"
          />
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontRegular}
            className="bg-slate-200 text-sky-900 rounded-2xl p-5 placeholder:text-xl"
            placeholder="المسمى الوظيفي"
          />
          <TextInput
            placeholderTextColor={"#64748b"}
            style={fonts.fontRegular}
            className="bg-slate-200 text-sky-900 rounded-2xl p-5 placeholder:text-xl"
            placeholder="رقم الهاتف"
          />
        </View>
        <Pressable className="bg-sky-600 rounded-2xl p-5 mx-4 mt-10 flex items-center">
          <Text
            style={fonts.fontBold}
            className="text-center text-white text-xl"
          >
            انشاء حساب
          </Text>
        </Pressable>
        <Pressable className="bg-sky-600 rounded-2xl p-5 mx-4 mt-10 flex items-center">
          <Text
            style={fonts.fontBold}
            className="text-center text-white text-xl"
          >
            انشاء حساب
          </Text>
        </Pressable>
        <Pressable className="bg-sky-600 rounded-2xl p-5 mx-4 mt-10 flex items-center">
          <Text
            style={fonts.fontBold}
            className="text-center text-white text-xl"
          >
            انشاء حساب
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;
