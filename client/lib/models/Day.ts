import { BaseModel } from "./BaseModel";

export type Day = BaseModel & {
  time: string;
  start_date: string;
  end_date: string;
  name: string;
  status: boolean;
  location_id: number;
};
