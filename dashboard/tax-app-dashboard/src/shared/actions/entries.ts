"use server";

import { revalidatePath } from "next/cache";
import * as http from "../fetch";
import { Entry } from "@/models";

type NewReceipt = { location_id: number; day_id: number };

const endpoint = "entries/";

export async function getSingleEntry(id: number) {
  return await http.getRequest<Entry>(`${endpoint}${id}`);
}

export async function deleteEntry(id: number) {
  const res = await http.deleteRequest(`${endpoint}${id}`);
  if (res.ok) {
    revalidatePath("/receipts");
  }
  return res.ok;
}

export async function addEntries(data: { entries: Entry[] }) {
  const res = await http.postRequest<{ entries: Entry[] }>(endpoint, data);
  if (res.success) {
    revalidatePath("/receipts");
  }
  return res;
}

export async function editEntry(entry: Entry) {
  const res = await http.patchRequest<Entry>(`${endpoint}${entry.id}`, entry);
  if (res.success) {
    revalidatePath("/receipts");
  }
  return res;
}
