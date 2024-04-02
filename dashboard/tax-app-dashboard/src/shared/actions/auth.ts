"use server";

import { BaseResponse } from "@/models";
import { setToken } from "../cookies";
import * as http from "../fetch";

type LoginData = {
  phone: string;
  password: string;
  device_id: string;
};

const endpoint = "auth/";

export async function login(phone: string, password: string) {
  const res = await http.postRequest<LoginData, { token: string }>(
    `${endpoint}login`,
    {
      phone,
      password,
      device_id: "web",
    }
  );
  if (res.success) {
    setToken(res.data.token);
  }
  return res;
}
