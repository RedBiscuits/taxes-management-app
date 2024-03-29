import { BaseModel } from "./BaseModel";

export type Receipt = BaseModel & {
  location_id: number;
  day_id: number;
  total: number;
  entries: Entry[];
};

export type Entry = BaseModel & {
  value: number;
  tax_type: string;
  payment_type: string;
  receipt_id: number;
};
