import { BaseModel } from "./BaseModel";

export type User = BaseModel & {
  id: number;
  name: string;
  phone: string;
  job: string;
  location_id: number;
  device_id: string;
  created_at: Date;
  updated_at: Date;
  roles: { id: number; name: "employee" | "manager" }[];
  location: any;
};
