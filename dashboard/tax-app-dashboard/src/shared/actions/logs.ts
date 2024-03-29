"use server";

import { Log } from "@/models/Log";
import * as http from "../fetch";
import { revalidatePath } from "next/cache";

export async function getLatestLog() {
  return (await http.getRequest<Log[]>("logs")).data[0];
}

export async function addLog(content: string, version: number) {
  const res = await http.postRequest<{ content: string; version: string }>(
    "logs",
    {
      content,
      version: String(version),
    }
  );

  if (res.success) revalidatePath("/logs");
  return res;
}
