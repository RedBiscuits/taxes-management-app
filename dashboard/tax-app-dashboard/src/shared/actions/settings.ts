"use server";

import { PaginatedResponse } from "@/models";
import * as http from "../fetch";
import { revalidatePath } from "next/cache";
import { boolean } from "zod";

const endpoint = "features";
export type FeatureNames =
  | "receipts_active"
  | "payments_active"
  | "targets_active";

export type FeatureMap = { [K in FeatureNames]: boolean };

export async function getAll() {
  return await http.getRequest<FeatureMap>(endpoint);
}

export async function toggle(name: FeatureNames, value: boolean) {
  const res = await http.patchRequest<{
    feature_name: FeatureNames;
    value: boolean;
  }>(`${endpoint}/toggle`, { feature_name: name, value });

  if (res.success) {
    revalidatePath("/settings");
  }

  return res;
}
