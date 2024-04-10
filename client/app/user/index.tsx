import { View } from "react-native";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { options } from "@/lib/constants";
import { Button } from "@/lib/components";
import { useLog } from "./_components/logs.hooks";
import { useGet } from "@/lib/shared/query";
import { Log } from "@/lib/models";
import { LogsModal } from "./_components/logsModal";

export default function MainUserScreen() {
  const [logModal, setLogModal] = useState<
    "SHOW_MODAL" | "HIDE_MODAL" | "DEFAULT"
  >("DEFAULT");

  const log = useLog();
  const currentLog = log.get();

  const { data } = useGet<Log[]>("logs", ["log"]);

  if (logModal === "DEFAULT") {
    if (data) {
      if (!currentLog) {
        log.set(data[0]);
        setLogModal("SHOW_MODAL");
      } else if (currentLog.id < data[0].id) {
        log.set(data[0]);
        setLogModal("SHOW_MODAL");
      }
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "الرئيسة",
          ...options,
        }}
      />
      <View className="flex-1 justify-center bg-white">
        <View>
          <Button
            text="التحصيلات"
            onPress={() => router.push("/user/receipts/")}
          />
          <Button
            text="اوامر التوريد"
            onPress={() => router.push("/user/payments/")}
          />
          <Button
            text="المستهدف"
            onPress={() => router.push("/shared/target/")}
          />
          <Button text="التنبيهات" onPress={() => setLogModal("SHOW_MODAL")} />
        </View>
      </View>
      <LogsModal
        open={"SHOW_MODAL" === logModal}
        toggleModal={() => setLogModal("HIDE_MODAL")}
        log={currentLog}
      />
    </>
  );
}
