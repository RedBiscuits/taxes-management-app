import React from "react";
import { Stack } from "expo-router/stack";
import {
  useFonts,
  ElMessiri_400Regular,
  ElMessiri_700Bold,
  ElMessiri_600SemiBold,
} from "@expo-google-fonts/dev";

const RootLayout = () => {
  let [fontsLoaded] = useFonts({
    ElMessiri_400Regular,
    ElMessiri_700Bold,
    ElMessiri_600SemiBold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
};

export default RootLayout;
