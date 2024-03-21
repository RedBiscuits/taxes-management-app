import { OldDay } from "@/lib/components";
import { Day, PaginatedResponse } from "@/lib/models";
import { useGet } from "@/lib/shared/query";
import { colors, fonts } from "@/lib/styles";
import { Dispatch, SetStateAction } from "react";
import {
  Modal,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import { useOldDayStore } from "../logic/OldDay/oldDay.zustand";
import { router } from "expo-router";

export function OldDaysModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  // TODO:send location id in request
  const { data, isPending } = useGet<PaginatedResponse<Day>>("days", [
    "days",
    "old",
  ]);

  const setDay = useOldDayStore((s) => s.setDay);

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View className="flex-1 bg-black/50">
        <View className="  flex w-full justify-center absolute h-96 top-1/3">
          <View className="mx-4 bg-white p-6  rounded-lg">
            <View className="flex flex-row w-full justify-end">
              <Text onPress={() => setIsOpen(false)}>
                <Icon name="close" size={22} />
              </Text>
            </View>
            <Text
              style={fonts.fontArabicBold}
              className="text-xl text-center mb-6"
            >
              اختر يومية قديمة لعرضها
            </Text>
            <View className="my-2" />

            {(() => {
              if (isPending)
                return (
                  <ActivityIndicator color={colors.primary_blue} size="large" />
                );
              else if (data)
                return (
                  <FlatList
                    data={data.data}
                    renderItem={({ item }) => (
                      <Pressable
                        onPress={() => {
                          setDay(item);
                          setIsOpen(false);
                          router.push("/user/receipts/OldDayReceipts");
                        }}
                      >
                        <OldDay day={item} />
                      </Pressable>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    ItemSeparatorComponent={() => <View className="h-2" />}
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
      </View>
    </Modal>
  );
}
