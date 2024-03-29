import { BaseModel } from "./BaseModel";

export type User = BaseModel & {
  id: number;
  name: string;
  phone: string;
  job: string;
  device_id: string;
  created_at: Date;
  updated_at: Date;
  roles: { id: number; name: "employee" | "manager" }[];
  location: {
    id: number;
    name: string;
    yearly_target: number;
  };
};
