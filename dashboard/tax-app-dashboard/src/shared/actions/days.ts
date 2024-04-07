"use server";

import { Day } from "@/models";
import * as http from "../fetch";

export async function getDays() {
  return await http.getRequest<Day[]>("days");
}
