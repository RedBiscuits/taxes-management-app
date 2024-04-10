import { Log } from "@/lib/models";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useLog() {
  const qc = useQueryClient();

  const log = useQuery({
    queryKey: ["current_log"],
    queryFn: async () => {
      const currentLog = await AsyncStorage.getItem("current_log");
      if (!currentLog) return null;
      return JSON.parse(currentLog) as Log;
    },
  });

  const setLog = useMutation({
    mutationFn: async (log: Log | null) => {
      log
        ? await AsyncStorage.setItem("current_log", JSON.stringify(log))
        : await AsyncStorage.removeItem("current_log");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["current_log"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return {
    get: () => log.data,
    set: setLog.mutate,
  };
}
