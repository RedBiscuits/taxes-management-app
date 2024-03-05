export type Base_Response<TData> = {
  success: boolean;
  message: string;
  data: TData;
  errors: null | string;
};
