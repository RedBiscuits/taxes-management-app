import {
  FlatList,
  View,
  Text,
  Modal,
  ActivityIndicator,
  Pressable,
} from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import { options } from "@/lib/constants";
import { Stack } from "expo-router";
import { Button, DatePicker, Input, PaymentCard } from "@/lib/components";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts } from "@/lib/styles";
import { useGet } from "@/lib/shared/query";
import { PaginatedResponse, Payment } from "@/lib/models";
import { useDebouncedCallback } from "use-debounce";

export default function PayPaymentScreen() {
  const [query, setQuery] = useState("");
  const [payment, setPayment] = useState<Payment>();

  const { data, isPending } = useGet<PaginatedResponse<Payment>>(
    !!query ? `payments?phone=${query}` : "payments",
    ["payments", query]
  );

  const handleSearch = useDebouncedCallback((term) => setQuery(term), 300);

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
                <FlatList
                  data={data?.data}
                  renderItem={({ item }) => (
                    <Pressable onPress={() => setPayment(item)}>
                      <PaymentCard elevation={true} {...item} />
                    </Pressable>
                  )}
                  keyExtractor={(item) => item.id.toString()}
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
  return (
    <Modal visible={!!payment} animationType="fade" transparent>
      <View className="flex-1 bg-black/50">
        <View className="  flex w-full justify-center absolute top-32">
          <View className="mx-4 bg-white p-6  rounded-lg">
            <Text
              style={fonts.fontArabicBold}
              className="text-xl text-center mb-6"
            >
              تسديد امر توريد
            </Text>
            {payment && <PaymentCard {...payment} elevation={false} />}
            <View className="my-2" />
            <DatePicker date={date} setDate={setDate} label="تاريخ التسديد" />
            <Button
              onPress={() => toggleModal(undefined)}
              text="تأكيد"
              className="mt-8 w-full mx-auto"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
}
