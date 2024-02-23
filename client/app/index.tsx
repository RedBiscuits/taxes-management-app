import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Link href="/login/" style={styles.link}>
          login
        </Link>
        <Link href="/dashboard/create account/" style={styles.link}>
          create account
        </Link>
        <Link href="/home" style={styles.link}>
          home
        </Link>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    flex: 1,
    backgroundColor: "#eeeeee",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  link: {
    fontSize: 20,
    color: "#fff",
    padding: 10,

    backgroundColor: "deepskyblue",
  },
});
