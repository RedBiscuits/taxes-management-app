import { View, Text, Modal, ScrollView } from "react-native";
import React from "react";
import { Button } from "@/lib/components";
import { fonts } from "@/lib/styles";

export function LogsModal({
  open,
  toggleModal,
}: {
  open: boolean;
  toggleModal: () => void;
}) {
  return (
    <Modal visible={open} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <View className="  flex w-full justify-center absolute top-40">
          <View className="mx-4 bg-white p-6  rounded-lg">
            <Text
              style={fonts.fontArabicBold}
              className="text-xl text-center mb-6"
            >
              التنبيهات
            </Text>
            <ScrollView className="my-4  p-4 pb-20 h-80 rounded-lg bg-neutral-200">
              <Text style={fonts.fontArabicRegular} className="text-lg ">
                إضافة ميزة تسجيل الدخول باستخدام البصمة لتعزيز الأمان. تحسين
                أداء التطبيق وزيادة سرعته في التنقل بين الصفحات. تحسين واجهة
                المستخدم لتوفير تجربة استخدام أفضل. تصحيح الأخطاء البرمجية
                وتحسين استقرار التطبيق. تحديث قاعدة البيانات لتوفير دعم أفضل
                للبيانات الجديدة.
              </Text>
              <Text style={fonts.fontArabicRegular} className="text-lg ">
                إضافة ميزة تسجيل الدخول باستخدام البصمة لتعزيز الأمان. تحسين
                أداء التطبيق وزيادة سرعته في التنقل بين الصفحات. تحسين واجهة
                المستخدم لتوفير تجربة استخدام أفضل. تصحيح الأخطاء البرمجية
                وتحسين استقرار التطبيق. تحديث قاعدة البيانات لتوفير دعم أفضل
                للبيانات الجديدة.
              </Text>
              <Text style={fonts.fontArabicRegular} className="text-lg ">
                إضافة ميزة تسجيل الدخول باستخدام البصمة لتعزيز الأمان. تحسين
                أداء التطبيق وزيادة سرعته في التنقل بين الصفحات. تحسين واجهة
                المستخدم لتوفير تجربة استخدام أفضل. تصحيح الأخطاء البرمجية
                وتحسين استقرار التطبيق. تحديث قاعدة البيانات لتوفير دعم أفضل
                للبيانات الجديدة.
              </Text>
              <View className="mb-10" />
            </ScrollView>
            <Button
              onPress={toggleModal}
              text="تأكيد"
              className="mt-8 w-full mx-auto"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
