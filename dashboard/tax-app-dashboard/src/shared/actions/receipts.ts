"use server";

import { revalidatePath } from "next/cache";
import * as http from "../fetch";
import { PaginatedResponse, Receipt } from "@/models";

const endpoint = "receipts/";

export async function getReceipts(page: number = 1, filters?: string) {
  const fullUrl = filters ? `${endpoint}?${filters}` : endpoint;
  return await http.getRequest<PaginatedResponse<Receipt>>(fullUrl);
}

export async function getSingleReceipt(id: number) {
  return await http.getRequest<Receipt>(`${endpoint}${id}`);
}

export async function createReceipt(data: any) {
  // TODO:make this work
  const res = await http.postRequest(endpoint, data);
  if (res.success) {
    revalidatePath("/receipts");
  }
  return res;
}
