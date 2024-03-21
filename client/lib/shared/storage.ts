import * as SecureStore from "expo-secure-store";
import { User } from "@/lib/models";

export async function getToken() {
  return await SecureStore.getItemAsync("token");
}

export async function setToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export async function setUser(user: User) {
  await SecureStore.setItemAsync("user", JSON.stringify(user));
}

export async function getUser() {
  const userString = await SecureStore.getItemAsync("user");
  if (!userString) {
    return null;
  }
  return JSON.parse(userString) as User;
}

