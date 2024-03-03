import * as SecureStore from "expo-secure-store";

export async function getToken() {
  return await SecureStore.getItemAsync("token");
}

export async function setToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export async function setUser(user: any) {
  await SecureStore.setItemAsync("user", JSON.stringify(user));
}

export async function getUser() {
  const userString = await SecureStore.getItemAsync("user");
  if (!userString) {
    return null;
  }
  return JSON.parse(userString) as User;
}

export type User = {
  id: number;
  name: string;
  phone: string;
  job: string;
  created_at: Date;
  updated_at: Date;
  admin: {
    id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
  } | null;
  employee: {
    id: number;
    user_id: number;
    created_at: Date;
    updated_at: Date;
  } | null;
};
