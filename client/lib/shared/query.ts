import {
  useQuery,
  useMutation,
  UseMutationOptions,
  UseQueryOptions,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getToken } from "./storage";
import { BaseResponse } from "@/lib/models";
import { API_URL } from "@/lib/constants/api";
import * as http from "@/lib/shared/fetch";

export function useGet<TData>(
  url: string,
  key: string[],
  options?: UseQueryOptions<BaseResponse<TData>, Error, TData, string[]>
) {
  return useQuery({
    queryKey: key,
    queryFn: async () => await http.getRequest<TData>(url),
    select: (data) => data.data,
    ...options,
  });
}

export function usePost<TData, TResponse = Response>(
  url: string,
  invalidate: string[][],
  options: UseMutationOptions<BaseResponse<TResponse>, Error, TData> = {}
) {
  const qc = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation<BaseResponse<TResponse>, Error, TData>({
    mutationFn: async (data) =>
      await http.postRequest<TData, TResponse>(url, data),
    onSuccess: (...args) => {
      invalidate.forEach((key) => qc.invalidateQueries({ queryKey: key }));
      console.log("hello from inner on success");
      onSuccess?.(...args);
    },
    ...rest,
  });
}
export function usePatch<TData, TResponse = Response>(
  url: string,
  invalidate: string[][],
  options: UseMutationOptions<BaseResponse<TResponse>, Error, TData> = {}
) {
  const qc = useQueryClient();

  const { onSuccess, ...rest } = options;

  return useMutation<BaseResponse<TResponse>, Error, TData>({
    mutationFn: async (data) =>
      await http.patchRequest<TData, TResponse>(url, data),
    onSuccess: (...args) => {
      invalidate.forEach((key) => qc.invalidateQueries({ queryKey: key }));
      console.log("hello from inner on success");
      onSuccess?.(...args);
    },
    ...rest,
  });
}

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
  return useQuery<any, AxiosError, AxiosResponse<BaseResponse<T>>>({
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
      AxiosResponse<BaseResponse<TResponse>>,
      AxiosError,
      TData
    >,
    "mutationFn"
  >
) => {
  return useMutation<AxiosResponse<BaseResponse<TResponse>>, AxiosError, TData>(
    {
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
    }
  );
};
