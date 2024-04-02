"use server";

import { PaginatedResponse, User } from "@/models";
import * as http from "../fetch";

const endpoint = "users/";

export async function getUsers(page: number = 1) {
  return await http.getRequest<PaginatedResponse<User>>(endpoint, page);
}
