import { Base_Model } from "./Base_Model";

export type Receipt = Base_Model & {
  location_id: number;
  day_id: number;
  total: number;
  entries: Entry[];
};

export type Entry = Base_Model & {
  value: number;
  type: string;
  receipt_id: number;
};
