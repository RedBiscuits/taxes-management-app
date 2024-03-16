import { Stack, router } from "expo-router";
import { Button } from "@/lib/components";
import { useCustomMutation } from "@/lib/shared/query";
import { useDayStore } from "./logic/day.zustand";
import { useState } from "react";
import { options } from "@/lib/constants/ScreenOptions";
import { View } from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import dayjs from "dayjs";

type dayData = {
  name: string;
  start_date: string;
  end_date: string;
  time: string;
  location_id: string;
};

const Home = () => {
  const [dayDate, setDayDate] = useState(new Date());
  const openDay = useDayStore((store) => store.setDay);
  const isDayOpen = useDayStore((store) => store.isOpen);

  const createDay = useCustomMutation<dayData, dayData & { id: number }>(
    "/days",
    "post",
    {
      onSuccess: (data) => {
        openDay(dayDate, data.data.data.id);
        router.push("/user/receipts/");
      },
    }
  );

  function createDayHandler(
    start_date: string,
    end_date: string,
    time: string
  ) {
    createDay.mutate({
      name: "reservation",
      start_date,
      end_date,
      time,
      location_id: "1",
    });
  }

  function showDatePicker() {
    DateTimePickerAndroid.open({
      value: dayDate,
      onChange: (e, date) => {
        date && setDayDate(date);
        const start_date = dayjs(date).format("YYYY/MM/DD HH:mm:ss");
        const end_date = dayjs(start_date)
          .add(2, "day")
          .format("YYYY/MM/DD HH:mm:ss");

        if (e.type === "set") {
          createDayHandler(start_date, end_date, start_date);
        }
      },
      mode: "date",
      is24Hour: false,
    });
  }

  if (isDayOpen) {
    router.replace("/user/receipts/");
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "الرئيسية",
          ...options,
        }}
      />
      <View className="flex-1 justify-center bg-white">
        <Button
          loading={createDay.isPending}
          onPress={() => showDatePicker()}
          text="ابدأ يوم"
        />
      </View>
    </>
  );
};

export default Home;
