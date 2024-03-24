import { Day } from "@/lib/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useOpenDay() {
  const qc = useQueryClient();

  const day = useQuery({
    queryKey: ["current_day"],
    queryFn: async () => {
      const currentDay = await AsyncStorage.getItem("current_day");
      if (!currentDay) return null;
      return JSON.parse(currentDay) as Day;
    },
  });

  const setDay = useMutation({
    mutationFn: async (day: Day | null) => {
      day
        ? await AsyncStorage.setItem("current_day", JSON.stringify(day))
        : await AsyncStorage.removeItem("current_day");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["current_day"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    day: {
      get: () => day.data,
      set: setDay.mutate,
    },
  };
}
