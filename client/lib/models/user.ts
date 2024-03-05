import { Base_Model } from "./Base_Model";

export type User = Base_Model & {
  id: number;
  name: string;
  phone: string;
  job: string;
  device_id: string;
  created_at: Date;
  updated_at: Date;
  roles: { id: number; name: string }[];
  location: any;
};
