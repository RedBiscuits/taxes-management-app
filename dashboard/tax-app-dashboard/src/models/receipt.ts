import { BaseModel } from "./BaseModel";
import { Day } from "./Day";
import { Location } from "./user";

export type Receipt = BaseModel & {
  location_id: number;
  day_id: number;
  total: number;
  entries: Entry[];
  day?: Day;
  location?: Location;
};

export type Entry = BaseModel & {
  value: number;
  tax_type: string;
  payment_type: string;
  receipt_id: number;
};

export type TableEntry = Entry & {
  time: string;
  location_name: string;
};
