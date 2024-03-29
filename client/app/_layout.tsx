import React from "react";
import { Stack } from "expo-router/stack";
import {
  useFonts,
  ElMessiri_400Regular,
  ElMessiri_700Bold,
  ElMessiri_600SemiBold,
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/dev";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { useOnlineManager } from "@/lib/hooks/useOnlineManager";
import { AppStateStatus, Platform } from "react-native";
import { useAppState } from "@/lib/hooks/useAppStateChange";
import ToastModal from "@/lib/components/toastModal/ToastModal";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const RootLayout = () => {
  const queryClient = new QueryClient();
  useOnlineManager();
  useAppState(onAppStateChange);

  const [fontsLoaded] = useFonts({
    ElMessiri_400Regular,
    ElMessiri_700Bold,
    ElMessiri_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Stack />
      <ToastModal />
    </QueryClientProvider>
  );
};

export default RootLayout;
