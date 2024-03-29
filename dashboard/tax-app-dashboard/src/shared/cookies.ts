import { cookies } from "next/headers";

export function getToken() {
  return cookies().get("token")?.value;
}

export function setToken(token: string) {
  cookies().set("token", token);
}

export function removeToken() {
  cookies().delete("token");
}
