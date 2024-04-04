"use server";

import { PaginatedResponse, Payment } from "@/models";
import * as http from "../fetch";
import { revalidatePath } from "next/cache";
import { PaymentData } from "@/app/(pages)/payments/new/_components/upsertPaymentForm";

const endpoint = "payments/";

export async function getPayments(page: number = 1, filters?: string) {
  const fullUrl = filters ? `${endpoint}?${filters}` : `${endpoint}`;
  console.log(fullUrl);
  return await http.getRequest<PaginatedResponse<Payment>>(fullUrl, page);
}
export async function getSinglePayment(id: number) {
  return await http.getRequest<Payment>(`${endpoint}${id}`);
}

export async function createPayment(data: PaymentData) {
  const res = await http.postRequest<PaymentData & { user_id: number }>(
    endpoint,
    { ...data, user_id: 1 }
  );

  if (res.success) {
    revalidatePath("/payments");
  }
  return res;
}

export async function deletePayment(id: number) {
  const res = await http.deleteRequest(`${endpoint}${id}`);
  if (res.ok) {
    revalidatePath("/payments");
  }
  return res.ok;
}

export async function updatePayment(data: PaymentData, id: number) {
  const res = await http.patchRequest<PaymentData & { user_id: number }>(
    `${endpoint}${id}`,
    { ...data, user_id: 1 }
  );
  if (res.success) {
    revalidatePath("/payments");
  }
  return res;
}
