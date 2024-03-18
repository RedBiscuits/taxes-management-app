import { View, Text, Modal, Pressable } from "react-native";
import React, { useEffect } from "react";
import { useToast } from "./toastModal.zustand";
import { fonts } from "@/lib/styles";
import Icon from "react-native-vector-icons/AntDesign";

export default function ToastModal() {
  const { isOpen, message, toast, type } = useToast();

  const iconProps = () => {
    switch (type) {
      case "success":
        return { name: "checkcircle", color: "#00a680" };
      case "error":
        return { name: "closecircle", color: "#ff0000" };
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        toast.close();
      }, 1500);
    }
  }, [isOpen]);

  return (
    <Modal visible={isOpen} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <View className="  flex w-full justify-center absolute top-1/2">
          <Pressable
            onPress={toast.close}
            className="mx-4 bg-white p-6 rounded-lg flex flex-row-reverse items-center justify-center"
          >
            <Text>
              <Icon {...iconProps()} size={60} />
            </Text>
            <Text
              style={fonts.fontArabicBold}
              className="text-lg text-center mr-4"
            >
              {message}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
