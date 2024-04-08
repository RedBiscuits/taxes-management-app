"use server";

import { revalidatePath } from "next/cache";
import * as http from "../fetch";
import { Target } from "@/models/target";
import { TargetData } from "@/app/(pages)/targets/[id]/_components/upsertTargetForm";

const endpoint = "targets/";

export async function getTarget(location_id: number) {
  return await http.getRequest<Target>(
    `${endpoint}?location_id=${location_id}`
  );
}

export async function createTarget(target: TargetData) {
  const res = await http.postRequest<TargetData & { total_percentage: number }>(
    endpoint,
    {
      ...target,
      total_percentage: 100,
    }
  );
  if (res.success) {
    revalidatePath("/targets");
  }
  return res;
}
export async function updateTarget(target: TargetData, id: number) {
  const res = await http.patchRequest<
    TargetData & { total_percentage: number }
  >(`${endpoint}${id}`, {
    ...target,
    total_percentage: 100,
  });
  if (res.success) {
    revalidatePath("/targets");
  }
  return res;
}
