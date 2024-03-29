export type BaseResponse<TData> = {
  success: boolean;
  message: string;
  data: TData;
  errors: null | string;
};
