import { BaseModel } from "./BaseModel";

export type Payment = BaseModel & {
  amount: number;
  phone: string;
  close_data: string;
  user_id: number;
};
