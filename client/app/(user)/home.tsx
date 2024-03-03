import { Stack, router } from "expo-router";
import Button from "@/lib/components/Button";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useCustomMutation } from "@/lib/shared/query";
import { useDayStore } from "./day.zustand";
import { useState } from "react";
import { options } from "@/lib/shared/ScreenOptions";
import { Modal, View } from "react-native";

const Home = () => {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [dayDate, setDayDate] = useState(dayjs());
  const openDay = useDayStore((store) => store.setDay);
  const isDayOpen = useDayStore((store) => store.isOpen);

  const createDay = useCustomMutation("/days", "post", {
    onSuccess: (data: any) => {
      setOpenDateModal(false);
      console.log(data.data);

      openDay(dayDate, data.data?.data?.id);
      router.push("/(user)/Receipts");
    },
  });

  function createDayHandler() {
    createDay.mutate({
      name: "reservation",
      start_date: "2024/08/12 16:35:00",
      end_date: "2024/08/13 16:35:00",
      time: "2024/08/13 16:35:00",
      location_id: "2",
    });
  }

  if (isDayOpen) {
    router.replace("/Receipts");
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "الرئيسية",
          ...options,
        }}
      />
      <View className="flex-1 justify-center">
        <Button onPress={() => setOpenDateModal(true)} text="ابدأ يوم" />
      </View>

      <Modal
        visible={openDateModal}
        animationType="fade"
        className="mt-10 pt-20"
        onDismiss={() => setOpenDateModal(false)}
      >
        <DateTimePicker
          mode="single"
          date={dayDate.subtract(1, "day").toDate()}
          locale={"ar-EG"}
          onChange={({ date }) => {
            let correctDate = dayjs(date)
              .add(1, "day")
              .hour(dayjs().hour())
              .minute(dayjs().minute())
              .second(dayjs().second());

            setDayDate(correctDate);
          }}
        />
        <Button
          loading={createDay.isPending}
          className="mt-20"
          onPress={createDayHandler}
          text="تأكيد"
        />
        <Button onPress={() => setOpenDateModal(false)} text="اغلاق" />
      </Modal>
    </>
  );
};

export default Home;
