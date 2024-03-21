import { Day } from "@/lib/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

export function useOpenDay() {
  return useQuery({
    queryKey: ["current_day"],
    queryFn: async () => {
      const currentDay = await AsyncStorage.getItem("current_day");
      if (!currentDay) return;
      return JSON.parse(currentDay) as Day;
    },
  });
}
