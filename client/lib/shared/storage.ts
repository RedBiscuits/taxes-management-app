import * as SecureStore from "expo-secure-store";
import { User } from "@/lib/models";
import { useEffect, useState } from "react";
import { create } from "zustand";

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

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    (async () => {
      const user = (await getUser())!;
      setUser(user);
    })();
  }, []);

  return user;
}
