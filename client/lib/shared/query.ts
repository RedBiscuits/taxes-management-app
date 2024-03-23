import { PaginatedResponse } from "./../models/paginatedResponse";
import {
  useQuery,
  useMutation,
  UseMutationOptions,
  UseQueryOptions,
  useQueryClient,
  useInfiniteQuery,
  UndefinedInitialDataInfiniteOptions,
} from "@tanstack/react-query";
import { BaseResponse } from "@/lib/models";
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

export function useInfiniteGet<TData>(
  url: string,
  key: string[],
  // options?: UndefinedInitialDataInfiniteOptions<
  //   BaseResponse<PaginatedResponse<TData>>,
  //   Error,
  //   PaginatedResponse<TData>,
  //   string[],
  //   number
  // >
) {
  return useInfiniteQuery({
    queryKey: key,
    
    queryFn: async ({ pageParam }) => {
      const fullUrl = url.endsWith("?")
        ? `${url}&page=${pageParam}`
        : `${url}?page=${pageParam}`;

      return await http.getRequest<PaginatedResponse<TData>>(fullUrl);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, __, lastPageParams) => {
      return lastPage.data.last_page === lastPageParams
        ? null
        : lastPageParams + 1;
    },
    
    // ...options,
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
