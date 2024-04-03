"use server";
import { PaginatedResponse } from "./../../models/paginatedResponse";

import { Location } from "@/models";
import * as http from "../fetch";

const endpoint = "locations";

// make this retrun all locations
export async function getLocations() {
  return await http.getRequest<PaginatedResponse<Location>>(endpoint);
}
