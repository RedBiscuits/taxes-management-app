"use server";

import { revalidatePath } from "next/cache";
import * as http from "../fetch";
import { BaseModel, Entry, PaginatedResponse, Receipt } from "@/models";

type NewReceipt = { location_id: number; day_id: number };

const endpoint = "receipts/";

export async function getReceipts(page: number = 1, filters?: string) {
  const fullUrl = filters ? `${endpoint}?${filters}` : endpoint;
  return await http.getRequest<PaginatedResponse<Receipt>>(fullUrl, page);
}

export async function getReceiptsNoPagination(location_id: number) {
  return await http.getRequest<Receipt[]>(
    `${endpoint}all?location_id=${location_id}`
  );
}

export async function getSingleReceipt(id: number) {
  return await http.getRequest<Receipt>(`${endpoint}${id}`);
}

export async function createReceipt(day_id: number, location_id: number) {
  return await http.postRequest<NewReceipt, NewReceipt & BaseModel>(endpoint, {
    day_id,
    location_id,
  });
}
