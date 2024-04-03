"use server";

import { PaginatedResponse, User } from "@/models";
import * as http from "../fetch";
import { UserData } from "@/app/(pages)/users/new/_components/createUserForm";
import { revalidatePath } from "next/cache";

const endpoint = "users";

export async function getUsers(page: number = 1) {
  return await http.getRequest<PaginatedResponse<User>>(endpoint, page);
}
export async function getSingleUser(id: number) {
  return await http.getRequest<User>(`${endpoint}/${id}`);
}
export async function updateUser(user: UserData, id: number) {
  const res = await http.patchRequest<UserData, { success: boolean }>(
    `${endpoint}/${id}`,
    user
  );

  if (res.success) {
    revalidatePath("/users");
  }

  return res;
}

export async function deleteUser(id: number) {
  const res = await http.deleteRequest(`${endpoint}${id}`);
  if (res.ok) {
    revalidatePath("/users");
  }
  return res;
}
