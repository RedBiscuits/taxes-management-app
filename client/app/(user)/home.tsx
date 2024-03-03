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

  const createDay = useCustomMutation("/days/create", "post", {
    onSuccess: (data) => {
      setOpenDateModal(false);
      console.log(data.data);

      // openDay(dayDate);
      // router.push("/(user)/Add Reciept");
    },
  });

  function createDayHandler() {
    createDay.mutate({
      name: "يوم",
      start_date: dayjs(),
      end_date: dayjs().add(2, "day"),
      time: dayDate,
      location_id: String(1),
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
