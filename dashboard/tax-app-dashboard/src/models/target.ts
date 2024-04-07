import { Location } from "./user";
import { BaseModel } from "./BaseModel";

export type Months =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

export type Target = BaseModel & {
  [K in Months]: number;
} & {
  location_id: number;
  Location: Location;
  total: number;
};

export type TargetMonths = {
  [K in keyof Target]: K extends Months ? K : never;
};
