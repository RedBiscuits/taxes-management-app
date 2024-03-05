import {
  useQuery,
  useMutation,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "./storage";
import { Base_Response } from "../models/Base_Reesponse";

export const API_URL = "https://briefly-easy-bluejay.ngrok-free.app/api";

async function createInstance() {
  const token = await getToken();
  return axios.create({
    baseURL: API_URL,
    headers: {
      "content-Type": "application/json",
      accept: "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    // timeout: 3000,
  });
}

export const useCustomQuery = <T>(
  url: string,
  method: "get" | "delete" = "get",
  options?: any
) => {
  return useQuery<any, AxiosError, AxiosResponse<Base_Response<T>>>({
    queryKey: [url],
    queryFn: async () => {
      const instance = await createInstance();
      return await instance[method](url);
    },
    select: (data) => data.data,
    onSettled: (data: any, error: any) => {
      console.log("data", data);
      console.log("error", error);
    },
    ...options,
  });
};

export const useCustomMutation = <TData, TResponse = any>(
  url: string,
  method: "post" | "patch" = "post",
  options?: Omit<
    UseMutationOptions<
      AxiosResponse<Base_Response<TResponse>>,
      AxiosError,
      TData
    >,
    "mutationFn"
  >
) => {
  return useMutation<
    AxiosResponse<Base_Response<TResponse>>,
    AxiosError,
    TData
  >({
    mutationKey: [url],
    mutationFn: async (data) => {
      const instance = await createInstance();
      return await instance[method](url, data);
    },
    onSettled: (data, error) => {
      console.log("data", data);
      console.log("error", error);
    },
    ...options,
  });
};
