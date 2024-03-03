import {
  useQuery,
  useMutation,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "./storage";

export const API_URL = "http://briefly-easy-bluejay.ngrok-free.app/api";

async function createInstance() {
  const token = await getToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      "content-Type": "application/json",
      accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    timeout: 3000,
  });
}

export const useCustomQuery = <T>(
  url: string,
  method: "get" | "delete" = "get",
  options?: any
) => {
  return useQuery<AxiosResponse<T>, AxiosError, T>({
    queryKey: [url],
    queryFn: async () => {
      const instance = await createInstance();
      return await instance[method](url);
    },
    select: (data) => data.data,
    onSettled: (data: any, error: any) => {
      console.log("data", JSON.stringify(data, null, 2));
      console.log("error", JSON.stringify(error, null, 2));
    },
    ...options,
  });
};

export const useCustomMutation = <T>(
  url: string,
  method: "post" | "patch" = "post",
  options?: Omit<
    UseMutationOptions<AxiosResponse<unknown>, AxiosError, T>,
    "mutationFn"
  >
) => {
  return useMutation<AxiosResponse<unknown>, AxiosError, T>({
    mutationKey: [url],
    mutationFn: async (data: any) => {
      const instance = await createInstance();
      return await instance[method](url, data);
    },
    onSettled: (data: any, error: any) => {
      console.log("data", JSON.stringify(data, null, 2));
      console.log("error", JSON.stringify(error, null, 2));
    },
    ...options,
  });
};
