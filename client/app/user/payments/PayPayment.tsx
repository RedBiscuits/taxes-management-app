import {
  FlatList,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import { Button, DatePicker, Input, PaymentCard } from "@/lib/components";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/lib/styles";
import { useInfiniteGet, usePatch } from "@/lib/shared/query";
import { Payment, User } from "@/lib/models";
import { useDebouncedCallback } from "use-debounce";
import Icon from "react-native-vector-icons/AntDesign";
import { useToast } from "@/lib/components/toastModal/toastModal.zustand";
import dayjs from "dayjs";
import { getUser } from "@/lib/shared/storage";

export default function PayPaymentScreen() {
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState<Payment>();
  const handleSearch = useDebouncedCallback((term) => setQuery(term), 300);

  const [user, setuser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const user = await getUser();
      setuser(user);
    })();
  }, []);

  const { data, isPending, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteGet<Payment>(
      !!query
        ? `payments?user_id=${user?.id}&close_date_operator==&phone=${query}`
        : `payments?user_id=${user?.id}&close_date_operator==`,
      ["payments", query],
      { enabled: !!user }
    );

  return (
    <>
      <Stack.Screen
        options={{
          title: "تسديد امر توريد",
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
                <>
                  <FlatList
                    data={data?.pages.flatMap((page) => page.data.data) || []}
                    renderItem={({ item, index }) => (
                      <Pressable
                        onPress={() => !item.close_date && setPayment(item)}
                      >
                        <PaymentCard elevation={true} {...item} />
                      </Pressable>
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    onEndReached={() => hasNextPage && fetchNextPage()}
                    ListFooterComponent={() => (
                      <View className="h-10">
                        {isFetchingNextPage && (
                          <ActivityIndicator
                            size={"large"}
                            color={colors.primary_blue}
                          />
                        )}
                      </View>
                    )}
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
                </>
              );
          })()}
        </View>
        <ConfirmPaymentModal payment={payment} toggleModal={setPayment} />
      </View>
    </>
  );
}

function ConfirmPaymentModal({
  toggleModal,
  payment,
}: {
  toggleModal: Dispatch<SetStateAction<Payment | undefined>>;
  payment?: Payment;
}) {
  const [date, setDate] = useState(new Date());
  const { toast } = useToast();

  console.log("payment", JSON.stringify(payment, null, 2));

  const { mutate, isPending } = usePatch<Payment>(
    `payments/${payment?.id}`,
    [["payments"]],
    {
      onSuccess: () => {
        toast.success("تمت العملية بنجاح");
      },
      onError: (error) => {
        console.log(error);
        toast.error("حدث خطأ ما");
      },
      onSettled: () => {
        toggleModal(undefined);
      },
    }
  );

  if (!payment) return null;
  return (
    <Modal visible={!!payment} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <View className="  flex w-full justify-center absolute top-32">
          <View className="mx-4 bg-white p-6  rounded-lg">
            <View className="flex flex-row w-full justify-end">
              <Text onPress={() => toggleModal(undefined)}>
                <Icon name="close" size={22} />
              </Text>
            </View>

            <Text
              style={fonts.fontArabicBold}
              className="text-xl text-center mb-6"
            >
              تسديد امر توريد
            </Text>
            <PaymentCard {...payment} elevation={false} />
            <View className="my-2" />
            <DatePicker date={date} setDate={setDate} label="تاريخ التسديد" />
            <Button
              loading={isPending}
              onPress={() =>
                mutate({
                  ...payment,
                  close_date:
                    dayjs(date).format("YYYY-MM-DDTHH:mm:ss.SSSSSS") + "Z",
                })
              }
              text="تأكيد"
              className="mt-8 w-full mx-auto"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
