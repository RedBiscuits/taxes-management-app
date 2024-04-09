import { BaseModel } from "./BaseModel";

export type User = BaseModel & {
  id: number;
  name: string;
  phone: string;
  job: "employee" | "manager";
  device_id: string;
  created_at: Date;
  updated_at: Date;
  roles: { id: number; name: "employee" | "manager" }[];
  location: Location;
};

export type Location = {
  id: number;
  name: string;
  yearly_target: number;
};
